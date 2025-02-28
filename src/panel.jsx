import React, { useState, useEffect } from "react";
import { auth, db } from "./Dbconfig/firebaseConfig"; // Ensure Firebase is initialized here
import { collection, getDocs, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import "./panel.css"; // Import the CSS file
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [scoreUpdates, setScoreUpdates] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const pointsCollection = collection(db, "pointsTable");
        const q = query(pointsCollection, orderBy("total_points", "desc"));
        const querySnapshot = await getDocs(q);
        let users = [];
        querySnapshot.forEach((docSnap) => {
          users.push({ id: docSnap.id, ...docSnap.data() });
        });
        setUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (id, value) => {
    setScoreUpdates((prev) => ({ ...prev, [id]: value }));
  };

  const updateScore = async (id) => {
    if (!scoreUpdates[id]) return; // Prevent updating if no change is entered
    const userRef = doc(db, "pointsTable", id);
    const increment = Number(scoreUpdates[id]);

    const newUsers = users.map(user =>
      user.id === id ? { ...user, total_points: user.total_points + increment } : user
    );

    setUsers(newUsers);
    await updateDoc(userRef, { total_points: newUsers.find(user => user.id === id).total_points });

    setScoreUpdates((prev) => ({ ...prev, [id]: "" })); // Reset input field after update
  };


  const logOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      console.log("User logged out, session cleared.");
      navigate("/");  // Redirect to Login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="admin-container">
    <button className="signout" onClick={logOutUser}>Sign Out</button>
    <div className="logo"></div>
      <div className="search-div">
        <input
          type="text"
          placeholder="Search by name"
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="grid-container">
        {users
          .filter(user => user.username?.toLowerCase().includes(search))
          .map((user,index) => (
            <motion.div key={user.id} className="user-card" initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{delay: 0,duration:0.3}}>
              <h2 className="user-name">{user.username}</h2>
              <p className="user-score">Score: {user.total_points}</p>
              {search == "" ? 
              <p className="user-rank">Rank: {index+1}</p>
              : " "}
              <div className="input-container">
                <input
                  type="number"
                  className="score-input"
                  value={scoreUpdates[user.id] || ""}
                  onChange={(e) => handleInputChange(user.id, e.target.value)}
                  placeholder="+/-"
                />
                <button className="update-button" onClick={() => updateScore(user.id)}>
                  Update
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default AdminPanel;

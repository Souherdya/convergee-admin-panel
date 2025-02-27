import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './signin.css'
import { useNavigate } from 'react-router-dom';
import { auth} from './Dbconfig/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

    const SignIn = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();
      
        // Function to log in user and set auto-login for 5 days
        const logInUser = async () => {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
      
            // Set expiration time for 5 days (in milliseconds)
            const expirationTime = Date.now() + 5 * 24 * 60 * 60 * 1000;
      
            // Store user info & expiration time
            localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid, expiration: expirationTime }));
      
            console.log("Login successful, auto-login enabled for 5 days!");
      
            // Redirect to ScorePanel
            navigate("/ScorePanel");
          } catch (error) {
            console.error("Login failed:", error.message);
            alert("Invalid credentials! Please try again.");
          }
        };
      
        // Function to check auto-login on component mount
        useEffect(() => {
          const checkAutoLogin = () => {
            const storedUser = localStorage.getItem("user");
      
            if (storedUser) {
              const { email, expiration } = JSON.parse(storedUser);
      
              if (Date.now() < expiration) {
                console.log("Auto-login successful for:", email);
                navigate("/ScorePanel"); // Redirect if still valid
              } else {
                console.log("Auto-login expired, clearing session.");
                localStorage.removeItem("user");
              }
            }
          };
      
          checkAutoLogin();
        }, [navigate]); // Add `navigate` to dependency array to avoid potential issues
      
        return (
          <motion.div className="sign-in-body">
            <motion.div className="sign-in-div">
              <h1 className="signin-h1">Sign In</h1>
              <input 
                className="mail" 
                type="text" 
                placeholder="Email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                className="pass-admin" 
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="button-admin" onClick={logInUser}>Sign in</button>
            </motion.div>
          </motion.div>
        );
      };
      
      export default SignIn;

import React, { useState } from "react";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
} from "../firebase";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login-img.jpg";
import logo from '../assets/logo.png';

import "../styles/Login.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email,
          firstName,
          lastName,
        });

        setMessage(`Welcome, ${firstName}!`);
        navigate("/home");
      } catch (error) {
        console.error("Signup error:", error.message);
        setMessage("Signup failed. Please try again.");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful!");
        navigate("/home");
      } catch (error) {
        console.error("Login error:", error.message);
        setMessage("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="loginPage">
      <div className="loginWrapper">
        <div className="loginImageSection">
          <img src={loginImage} alt="Login Visual" className="loginImage" />
          <div className="imageOverlay">
            <h2 className="overlayText">Welcome to SlugStudy!</h2>
          </div>
        </div>

        <div className="loginContainer">
          <div className="loginHeader">
            <img src={logo} alt="Slug Logo" className="loginLogo" />
            <h1 className="loginTitle">{isSignUp ? "Sign Up" : "Log In"}</h1>
          </div>

          {isSignUp ? (
            <p className="loginSubtitle">
              Welcome to StudySlug — create an account to get started!
            </p>
          ) : (
            <p className="loginSubtitle">
              Welcome back! Please log in to your account.
            </p>
          )}

          <div className="formWrapper">
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div className="inputGroup">
                    <label className="inputLabel">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="loginInput" // ✅ This ensures the style matches
                    />
                  </div>
                  <div className="inputGroup">
                    <label className="inputLabel">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="loginInput" // ✅ Must match!
                    />
                  </div>
                </>
              )}
              <div className="inputGroup">
                <label className="inputLabel">Username</label>
                <input
                  type="email"
                  placeholder="you@ucsc.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="loginInput"
                  required
                />
              </div>
              <div className="inputGroup">
                <label className="inputLabel">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="loginInput"
                  required
                />
              </div>
              <button type="submit" className="loginButton">
                {isSignUp ? "Sign Up" : "Log In"}
              </button>

              <div className="loginToggle">
                {isSignUp ? "Already have an account?" : "Need an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setMessage("");
                  }}
                  className="loginToggleButton"
                >
                  {isSignUp ? "Log In" : "Sign Up"}
                </button>
              </div>

              {message && <p className="loginMessage">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

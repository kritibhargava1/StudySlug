import React, { useState } from "react";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc
} from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email,
          firstName,
          lastName
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
      <div className="loginContainer">
        <h1 className="loginTitle">{isSignUp ? "Sign Up 🐌" : "Log In 🐌"}</h1>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="loginInput"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="loginInput"
              />
            </>
          )}
          <input
            type="email"
            placeholder="you@ucsc.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="loginInput"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="loginInput"
            required
          />
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
  );
}

export default Login;

import React, { useState } from "react";
import styled from "styled-components";
import { BackgroundImage, Header } from "../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      toast.success("Successfully signed in");
    } catch (error) {
      toast.error(`Something went wrong :${error.message}`);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Wrapper>
      <BackgroundImage />
      <div className="loginContent">
        <Header />
        {/* Form */}
        <div className="form-Wrapper">
          <div className="form">
            <div className="title">
              <h1>login</h1>
            </div>
            <div className="container">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
              <button onClick={handleLogin}>login</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  .loginContent {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    grid-template-columns: 15vh 85vh;

    .form-Wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      height: 85vh;
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      background-color: rgba(0, 0, 0, 0.83);
      height: 70vh;
      padding: 2rem;
      color: white;
      border-radius: 0.4rem;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      input {
        border-radius: 0.4rem;
        padding: 0.5rem 1rem;
        width: 25rem;
        height: 2.4rem;
        outline: none;
      }
      button {
        padding: 0.5rem;
        background-color: red;
        border: none;
        cursor: pointer;
        border-radius: 0.4rem;
        height: 3.4rem;
        color: white;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default LoginPage;

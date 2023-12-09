import React, { useState } from "react";
import styled from "styled-components";
import { BackgroundImage, Header } from "../components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      toast.success(`User created successfully`);
      navigate("/");
    } catch (error) {
      //console.log(error);
      toast.error(`Something went wrong : ${error.message}`);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login={"login"} />
        <div className="body">
          <div className="text">
            <h1>Unlimited movies, Tv shows and more</h1>
            <h4>watch anywhere, Cancel anytime</h4>
            <h6>
              Ready to watch ? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            {showPassword ? (
              <input
                value={formValues.password}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                type="password"
                placeholder="password"
                name="password"
              />
            ) : (
              <input
                value={formValues.email}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
                type="email"
                placeholder="email address"
                name="email"
              />
            )}

            {!showPassword ? (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            ) : (
              <button onClick={handleSignUp}>Sign Up</button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.79);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;

    .body {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: white;

      .text {
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 2rem;

        h1 {
          padding: 0 25rem;
        }
        h4,
        h6 {
          margin-top: -1.5rem;
        }
      }

      .form {
        display: grid;
        width: 60%;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        input {
          color: black;
          padding: 1.5rem;
          font-size: 1.2rem;
          width: 45rem;
          &:focus {
            outline: none;
          }
        }

        button {
          padding: 0.5rem 1rem;
          background-color: red;
          cursor: pointer;
          border: none;
          color: white;
          font-size: 1.5rem;
          width: 10rem;
        }
      }
    }
  }
`;

export default SignUpPage;

import React from "react";
import "../../src/Login/login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../src/firebase";
import { useStateValue } from "../../src/stateProvider/stateProvider";
import { actionTypes } from "../../src/stateProvider/reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        console.log(result);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login__text">
          <h1>Sign In to WhatsApp Zero</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;

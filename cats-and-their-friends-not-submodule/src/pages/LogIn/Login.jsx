import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./LogIn.module.scss";

const Login = () => {
  const navigate = useNavigate(); 

  const [state, setState] = useState({}); 
  const [isLogIn, setIsLogIn] = useState(false); 

  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault(); 

    if (!state.username.trim() || !state.password.trim()) return; 

    const response = await fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json;chraset=utf-8",
      },
      body: JSON.stringify(state),
    }); 

    const data = await response.json(); 

    if (data?.token) {
      localStorage.setItem("token", JSON.stringify({ token: data.token })); 
      setIsLogIn(!isLogIn); 
      setError(null); 
    } else {
      setError(data.status);
    }
  };

  const setDataInput = (event) => {
    setState({
      ...state,
      [event?.target?.name]: event?.target?.value,
    }); 
  };

  const cancelLogin = () => {
    navigate("/"); 
  };

  const logout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <div className={styles.LogInPage}>
      <div className={styles.LogInPage__wrap}>
        <form className={styles.LogInPage__form} onSubmit={onSubmit}>
          <h1 className={styles.LogInPage__title}>Enter</h1>
          <input
            type="text"
            name="username"
            onChange={(event) => setDataInput(event)}
            placeholder="UserName"
            className={styles.LogInPage__input}
          />
          <input
            type="text"
            name="password"
            onChange={(event) => setDataInput(event)}
            placeholder="Password"
            className={styles.LogInPage__input}
          />
          {error && <p className={styles.LogInPage__error}>Error {error}</p>}
          {isLogIn ? (
            <button className={styles.LogInPage__button} onClick={logout}>
              Exit
            </button>
          ) : (
            <button className={styles.LogInPage__button} type="submit">
              Enter
            </button>
          )}
          <button className={styles.LogInPage__button} onClick={cancelLogin}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

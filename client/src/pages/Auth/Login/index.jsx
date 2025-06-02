import { useState } from "react";
import axios from "axios";
import { BASE_SERVER_URL } from "../../../utils/constants.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import s from "../Auth.module.scss";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    void axios
      .post(`${BASE_SERVER_URL}/auth/login`, {
        email,
        password,
      })
      .then((r) => {
        toast.success("Успешная авторизация");

        const userString = JSON.stringify(r.data);

        window.localStorage.setItem("user", userString);

        navigate("/auth/login");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Вход в аккаунт</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Войти</button>
      </div>
    </form>
  );
};

import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../../core/api.js";
import s from "../Auth.module.scss";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    void instance
      .post("/auth/login", {
        email,
        password,
      })
      .then((r) => {
        const userString = JSON.stringify(r.data);

        window.localStorage.setItem("user", userString);
        window.localStorage.setItem("token", r.data.token);

        console.log("r.data", r.data);

        if (r.data.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/applications/list");
        }

        toast.success("Успешная авторизация");
      })
      .catch((r) => {
        if (r.status === 401) {
          return toast.error("Не верная почта или пароль");
        }
        toast.error("Что-то пошло не так");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Вход в аккаунт</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/auth/register">Нет аккаунта? Зарегистрироваться</Link>

        <button type="submit">Войти</button>
      </div>
    </form>
  );
};

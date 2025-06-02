import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER_URL } from "../../../utils/constants.js";
import s from "../Auth.module.scss";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    fullName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    void axios.post(`${BASE_SERVER_URL}/auth/register`, formData).then(() => {
      toast.success("Успешная регистрация");

      navigate("/auth/login");
    });
  };

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Регистрация</h1>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Никнкйм"
        />

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Полное имя"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Телефон"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Почта"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        <button type="submit">Зарегистрироваться</button>
      </div>
    </form>
  );
};

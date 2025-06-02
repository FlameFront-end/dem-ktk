import { useState } from "react";
import axios from "axios";
import { BASE_SERVER_URL } from "../../utils/constants.js";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    void axios.post(`${BASE_SERVER_URL}/auth/login`, {
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={phone}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

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
    </form>
  );
};

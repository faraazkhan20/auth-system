import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed!");
      setOpen(true);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>

      <Toast.Root open={open} onOpenChange={setOpen} duration={4000} className="toast-root">
        <Toast.Title>{message}</Toast.Title>
      </Toast.Root>
    </>
  );
}

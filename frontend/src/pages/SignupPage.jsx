import { useState } from "react";
import axios from "axios";
// import { toast } from "sonner";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, { email, password });
      console.log(res.data);
      // toast.success("Signup successful!");
      alert("Signup successful!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      // toast.error("Signup failed!");
      alert("Signup failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

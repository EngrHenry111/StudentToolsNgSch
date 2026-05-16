import { useState } from "react";
import { registerUser } from "../../../apiQuiz/authApi";
import { Link } from "react-router-dom";
import "./QuizRegister.css"

const Register = () => {
  const [form, setForm] = useState({
  username: "",
  email: "",
  password: ""
});
  

  const handleSubmit = async () => {
    await registerUser(form);
    alert("Registered successfully");
    window.location.href = "/login";
  };

  return (
  <div className="register-page">

    <div className="register-card">

      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleSubmit}>
        Register
      </button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </div>

  </div>
);
};

export default Register;
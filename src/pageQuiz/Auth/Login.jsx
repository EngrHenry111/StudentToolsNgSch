import { useState, useContext } from "react";
import { loginUser } from "../../apiQuiz/authApi";
import { AuthContext } from "../../contextQuiz/AuthContext";
import { Link , useNavigate} from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
const navigate = useNavigate();

 const handleSubmit = async () => {
  const res = await loginUser(form);

  if (res.accessToken) {   // ✅ FIXED
    login(res.accessToken);


navigate("/pro/quiz/ai");

    // window.location.href = "/pro/quiz/ai";
  } else {
    alert(res.message || "Login failed");
  }
};

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleSubmit}>Login</button>

      {/* 🔥 ADD THIS */}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
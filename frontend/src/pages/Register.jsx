import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/register", form);
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button>Register</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    );
}
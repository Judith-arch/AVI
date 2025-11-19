import { useState } from "react";
import api from "../api/api";

function Register() {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const res = await api.post("/api/register", {
        username,
        email,
        password,
    });

    console.log("Usuario registrado:", res.data);

    } catch (error) {
    console.error("Error al registrar:", error);
    }
};

return (
    <form onSubmit={handleSubmit}>
    <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
    <button>Registrar</button>
    </form>
);
}

export default Register;

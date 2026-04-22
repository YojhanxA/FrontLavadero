import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const data = await loginRequest(form);
      login(data);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message || "No fue posible iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div>
          <h1>Ingreso al sistema</h1>
          <p>Administra el lavadero desde un solo panel.</p>
        </div>

        <label className="field">
          <span>Usuario</span>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="admin"
          />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </label>

        {error ? <div className="error-box">{error}</div> : null}

        <button className="primary-button" disabled={loading}>
          {loading ? "Ingresando..." : "Entrar"}
        </button>

        <small className="hint-text">
          Usuario inicial sugerido: admin / Admin123*
        </small>
      </form>
    </div>
  );
}

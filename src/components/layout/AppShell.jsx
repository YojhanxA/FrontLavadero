import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";

export default function AppShell() {
  const { auth, logout } = useAuth();

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div>
            <h1 className="page-title">Panel del lavadero</h1>
            <p className="page-subtitle">
              Bienvenido, {auth?.fullName || auth?.username}
            </p>
          </div>
          <button className="secondary-button" onClick={logout}>
            Cerrar sesión
          </button>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

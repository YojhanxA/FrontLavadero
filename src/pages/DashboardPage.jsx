import { useEffect, useState } from "react";
import MetricCard from "../components/ui/MetricCard";
import WashTable from "../components/history/WashTable";
import { fetchDashboard } from "../services/washService";
import { formatCurrency } from "../utils/formatters";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const data = await fetchDashboard();
        setDashboard(data);
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message || "No fue posible cargar el dashboard"
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="panel">Cargando dashboard...</div>;
  }

  if (error) {
    return <div className="error-box">{error}</div>;
  }

  return (
    <div className="page-stack">
      <section className="metric-grid">
        <MetricCard
          title="Total del mes actual"
          value={formatCurrency(dashboard?.currentMonth?.totalAmount)}
          helper="Dinero generado en el mes"
        />
        <MetricCard
          title="Vehículos del mes"
          value={dashboard?.currentMonth?.totalVehicles ?? 0}
          helper="Cantidad de lavados este mes"
        />
        <MetricCard
          title="Total del día"
          value={formatCurrency(dashboard?.today?.totalAmount)}
          helper="Ingresos del día actual"
        />
        <MetricCard
          title="Vehículos del día"
          value={dashboard?.today?.totalVehicles ?? 0}
          helper="Cantidad registrada hoy"
        />
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <h2>Últimos lavados</h2>
            <p>Vista rápida de los registros recientes</p>
          </div>
        </div>
        <WashTable records={dashboard?.recentWashes || []} />
      </section>
    </div>
  );
}

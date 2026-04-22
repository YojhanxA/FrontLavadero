import { useEffect, useState } from "react";
import HistoryFilters from "../components/history/HistoryFilters";
import WashTable from "../components/history/WashTable";
import MetricCard from "../components/ui/MetricCard";
import { fetchHistory, deleteWash } from "../services/washService";
import { formatCurrency } from "../utils/formatters";

function defaultFilters() {
  const date = new Date();
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
    .toISOString()
    .slice(0, 10);

  return {
    startDate,
    endDate: new Date().toISOString().slice(0, 10),
    plate: "",
  };
}

export default function HistoryPage() {
  const [filters, setFilters] = useState(defaultFilters());
  const [history, setHistory] = useState({ records: [], summary: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  async function loadHistory(nextFilters) {
    try {
      setLoading(true);
      setError("");
      setFilters(nextFilters);
      const data = await fetchHistory(nextFilters);
      setHistory(data);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "No fue posible cargar el historial",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Seguro que deseas eliminar este lavado?",
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      await deleteWash(id);
      await loadHistory(filters);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "No fue posible eliminar el lavado",
      );
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    loadHistory(filters);
  }, []);

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-header">
          <div>
            <h2>Historial de lavados</h2>
            <p>Filtra por fechas y revisa el total generado.</p>
          </div>
        </div>

        <HistoryFilters initialFilters={filters} onSearch={loadHistory} />
      </section>

      {error ? <div className="error-box">{error}</div> : null}

      <section className="metric-grid">
        <MetricCard
          title="Carros en el rango"
          value={history?.summary?.totalVehicles ?? 0}
          helper="Cantidad total"
        />
        <MetricCard
          title="Dinero en el rango"
          value={formatCurrency(history?.summary?.totalAmount)}
          helper="Suma de los registros filtrados"
        />
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <h2>Listado</h2>
            <p>
              {loading
                ? "Cargando registros..."
                : `${history?.records?.length || 0} resultados encontrados`}
            </p>
          </div>
        </div>

        {loading ? <div className="panel">Cargando historial...</div> : null}

        {!loading ? (
          <WashTable
            records={history?.records || []}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        ) : null}
      </section>
    </div>
  );
}

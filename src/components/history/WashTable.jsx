import {
  formatCurrency,
  formatDate,
  formatDateTime,
} from "../../utils/formatters";

export default function WashTable({ records = [], onDelete, deletingId }) {
  if (!records.length) {
    return (
      <div className="empty-state">
        No hay lavados en el rango seleccionado.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Placa</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Observaciones</th>
            <th>Registrado por</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => (
            <tr key={item.id}>
              <td>{formatDate(item.washDate)}</td>
              <td>{item.plate}</td>
              <td>{item.vehicleType || "-"}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{item.observations || "-"}</td>
              <td>{item.createdBy}</td>
              <td>{formatDateTime(item.createdAt)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  disabled={deletingId === item.id}
                  style={{
                    backgroundColor: "#e53935",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    opacity: deletingId === item.id ? 0.6 : 1,
                  }}
                >
                  {deletingId === item.id ? "Eliminando..." : "Eliminar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

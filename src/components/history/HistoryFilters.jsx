import { useState } from "react";

function firstDayOfMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function HistoryFilters({ onSearch, initialFilters }) {
  const [filters, setFilters] = useState(
    initialFilters || {
      startDate: firstDayOfMonth(),
      endDate: today(),
      plate: ""
    }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(filters);
  }

  return (
    <form className="filter-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Fecha inicial</span>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Fecha final</span>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Placa (opcional)</span>
          <input
            name="plate"
            value={filters.plate}
            onChange={handleChange}
            placeholder="Buscar por placa"
          />
        </label>
      </div>

      <div className="actions-row">
        <button className="primary-button">Filtrar historial</button>
      </div>
    </form>
  );
}

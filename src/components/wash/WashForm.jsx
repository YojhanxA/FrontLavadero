import { useMemo, useState } from "react";

function getLocalDateInputValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localDate = new Date(now.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("T")[0];
}

const initialState = {
  plate: "",
  price: "",
  washDate: getLocalDateInputValue(),
  vehicleType: "AUTOMOVIL",
  observations: "",
};

export default function WashForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  function validate(values) {
    const nextErrors = {};

    if (!values.plate.trim()) {
      nextErrors.plate = "La placa es obligatoria";
    }

    if (!values.price || Number(values.price) <= 0) {
      nextErrors.price = "El precio debe ser mayor a 0";
    }

    if (!values.washDate) {
      nextErrors.washDate = "La fecha es obligatoria";
    }

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const next = { ...form, [name]: value };
    setForm(next);
    setErrors(validate(next));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSuccess("");

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);

      await onSubmit({
        plate: form.plate.trim().toUpperCase(),
        price: Number(form.price),
        washDate: form.washDate,
        vehicleType: form.vehicleType,
        observations: form.observations.trim(),
      });

      setSuccess("Lavado registrado correctamente");

      setForm({
        ...initialState,
        washDate: getLocalDateInputValue(),
        vehicleType: form.vehicleType,
      });

      setErrors({});
    } catch (error) {
      setSuccess("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Placa</span>
          <input
            name="plate"
            value={form.plate}
            onChange={handleChange}
            placeholder="ABC123"
            maxLength={10}
          />
          {errors.plate ? (
            <small className="error-text">{errors.plate}</small>
          ) : null}
        </label>

        <label className="field">
          <span>Precio</span>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="25000"
            min="1"
          />
          {errors.price ? (
            <small className="error-text">{errors.price}</small>
          ) : null}
        </label>

        <label className="field">
          <span>Fecha de lavado</span>
          <input
            name="washDate"
            type="date"
            value={form.washDate}
            onChange={handleChange}
          />
          {errors.washDate ? (
            <small className="error-text">{errors.washDate}</small>
          ) : null}
        </label>

        <label className="field">
          <span>Tipo de vehículo</span>
          <select
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
          >
            <option value="AUTOMOVIL">Automóvil</option>
            <option value="CAMIONETA">Camioneta</option>
            <option value="MOTO">Moto</option>
            <option value="TAXI">Taxi</option>
            <option value="OTRO">Otro</option>
          </select>
        </label>

        <label className="field field-full">
          <span>Observaciones</span>
          <textarea
            name="observations"
            value={form.observations}
            onChange={handleChange}
            placeholder="Ej: lavado premium, aspirado, cliente frecuente..."
            rows="4"
          />
        </label>
      </div>

      {success ? <div className="success-box">{success}</div> : null}

      <div className="actions-row">
        <button className="primary-button" disabled={!isValid || loading}>
          {loading ? "Guardando..." : "Registrar lavado"}
        </button>
      </div>
    </form>
  );
}

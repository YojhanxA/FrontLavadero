import { useState } from "react";
import WashForm from "../components/wash/WashForm";
import { createWash } from "../services/washService";

export default function RegisterWashPage() {
  const [error, setError] = useState("");

  async function handleCreateWash(payload) {
    try {
      setError("");
      await createWash(payload);
    } catch (requestError) {
      const message =
        requestError?.response?.data?.message || "No fue posible registrar el lavado";
      setError(message);
      throw requestError;
    }
  }

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-header">
          <div>
            <h2>Registrar vehículo lavado</h2>
            <p>Guarda placa, precio, fecha, tipo de vehículo y observaciones.</p>
          </div>
        </div>

        {error ? <div className="error-box">{error}</div> : null}

        <WashForm onSubmit={handleCreateWash} />
      </section>
    </div>
  );
}

export default function MetricCard({ title, value, helper }) {
  return (
    <article className="metric-card">
      <span className="metric-title">{title}</span>
      <strong className="metric-value">{value}</strong>
      {helper ? <span className="metric-helper">{helper}</span> : null}
    </article>
  );
}

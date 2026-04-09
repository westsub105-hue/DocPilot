import { getApiBaseUrl } from "@/lib/api";

export default function HomePage() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">DocPilot Day 1</p>
        <h1>Minimal foundation for document AI.</h1>
        <p className="copy">
          This scaffold keeps the first day focused: one frontend, one backend,
          one database, and enough structure to grow into parsing and contract
          analysis later.
        </p>
        <div className="card">
          <span>Backend API</span>
          <code>{apiBaseUrl}/api/v1/health</code>
        </div>
      </section>
    </main>
  );
}


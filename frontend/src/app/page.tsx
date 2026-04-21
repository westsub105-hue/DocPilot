import { getApiBaseUrl } from "@/lib/api";
import Link from "next/link";

export default function HomePage() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <main className="shell">
      <section className="panel hero">
        <p className="eyebrow">DocPilot Day 2</p>
        <h1>Upload, persist, and review documents.</h1>
        <p className="copy">
          The MVP now has a real document loop: upload a PDF, store the file on
          disk, record metadata in the database, and browse the saved documents
          from the frontend.
        </p>
        <div className="actionRow">
          <Link className="primaryButton" href="/upload">
            Upload a PDF
          </Link>
          <Link className="secondaryButton" href="/documents">
            Browse documents
          </Link>
        </div>
        <div className="card">
          <span>Backend API</span>
          <code>{apiBaseUrl}/api/v1/health</code>
        </div>
      </section>
    </main>
  );
}

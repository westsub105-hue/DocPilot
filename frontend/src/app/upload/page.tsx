"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { uploadDocument } from "@/lib/api";
import type { DocumentItem } from "@/types";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [document, setDocument] = useState<DocumentItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Please choose a PDF file first.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await uploadDocument(file);
      setDocument(result.document);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Upload failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="shell">
      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Day 2</p>
            <h1>Upload a document</h1>
          </div>
          <Link className="textLink" href="/documents">
            View documents
          </Link>
        </div>

        <form className="stack" onSubmit={handleSubmit}>
          <label className="uploadField">
            <span>Select a PDF</span>
            <input
              accept=".pdf,application/pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              type="file"
            />
          </label>
          <button className="primaryButton" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Uploading..." : "Upload document"}
          </button>
        </form>

        {error ? <p className="errorText">{error}</p> : null}

        {document ? (
          <div className="resultCard">
            <p className="eyebrow">Upload saved</p>
            <h2>{document.original_filename}</h2>
            <p className="copy">
              Document #{document.id} was stored on disk and recorded in the database.
            </p>
            <Link className="textLink" href={`/documents/${document.id}`}>
              Open details
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}

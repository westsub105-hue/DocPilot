"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { listDocuments } from "@/lib/api";
import type { DocumentItem } from "@/types";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDocuments() {
      try {
        const response = await listDocuments();
        if (isMounted) {
          setDocuments(response.items);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load documents.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDocuments();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="shell">
      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Documents</p>
            <h1>Uploaded files</h1>
          </div>
          <Link className="textLink" href="/upload">
            Upload another PDF
          </Link>
        </div>

        {isLoading ? <p className="copy">Loading documents...</p> : null}
        {error ? <p className="errorText">{error}</p> : null}

        {!isLoading && !error ? (
          documents.length > 0 ? (
            <div className="documentGrid">
              {documents.map((document) => (
                <Link
                  className="documentCard"
                  href={`/documents/${document.id}`}
                  key={document.id}
                >
                  <p className="eyebrow">#{document.id}</p>
                  <h2>{document.original_filename}</h2>
                  <p className="metaText">{document.content_type ?? "Unknown type"}</p>
                  <p className="metaText">{formatBytes(document.file_size)}</p>
                  <p className="metaText">{formatDate(document.created_at)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="emptyState">
              <h2>No documents yet</h2>
              <p className="copy">
                Upload your first PDF to see it appear here.
              </p>
            </div>
          )
        ) : null}
      </section>
    </main>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString();
}

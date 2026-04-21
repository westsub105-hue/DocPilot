"use client";

import { useEffect, useState } from "react";

import { getDocument } from "@/lib/api";
import type { DocumentItem } from "@/types";

type DocumentDetailViewProps = {
  documentId: string;
};

export default function DocumentDetailView({
  documentId,
}: DocumentDetailViewProps) {
  const [document, setDocument] = useState<DocumentItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDocument() {
      try {
        const response = await getDocument(documentId);
        if (isMounted) {
          setDocument(response.document);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load document details.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDocument();

    return () => {
      isMounted = false;
    };
  }, [documentId]);

  if (isLoading) {
    return <p className="copy">Loading document...</p>;
  }

  if (error) {
    return <p className="errorText">{error}</p>;
  }

  if (!document) {
    return <p className="copy">Document not found.</p>;
  }

  return (
    <dl className="detailGrid">
      <DetailRow label="Document ID" value={String(document.id)} />
      <DetailRow label="Original filename" value={document.original_filename} />
      <DetailRow label="Stored filename" value={document.stored_filename} />
      <DetailRow label="Content type" value={document.content_type ?? "Unknown"} />
      <DetailRow label="File size" value={`${document.file_size} bytes`} />
      <DetailRow label="Status" value={document.status} />
      <DetailRow label="Storage path" value={document.storage_path} />
      <DetailRow
        label="Created at"
        value={new Date(document.created_at).toLocaleString()}
      />
    </dl>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </>
  );
}

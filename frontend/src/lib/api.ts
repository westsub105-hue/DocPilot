import type {
  DocumentDetailResponse,
  DocumentListResponse,
  DocumentUploadResponse,
} from "@/types";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, init);

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`;
    let detailMessage = fallbackMessage;

    try {
      const payload = (await response.json()) as { detail?: string };
      detailMessage = payload.detail ?? fallbackMessage;
    } catch {
      detailMessage = fallbackMessage;
    }

    throw new Error(detailMessage);
  }

  return (await response.json()) as T;
}

export async function uploadDocument(file: File): Promise<DocumentUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<DocumentUploadResponse>("/api/v1/documents/upload", {
    method: "POST",
    body: formData,
  });
}

export async function listDocuments(): Promise<DocumentListResponse> {
  return apiRequest<DocumentListResponse>("/api/v1/documents");
}

export async function getDocument(id: string): Promise<DocumentDetailResponse> {
  return apiRequest<DocumentDetailResponse>(`/api/v1/documents/${id}`);
}

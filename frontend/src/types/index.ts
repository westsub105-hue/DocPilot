export type HealthResponse = {
  status: "ok";
};

export type DocumentItem = {
  id: number;
  original_filename: string;
  stored_filename: string;
  content_type: string | null;
  file_size: number;
  storage_path: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type DocumentUploadResponse = {
  document: DocumentItem;
};

export type DocumentListResponse = {
  items: DocumentItem[];
  total: number;
};

export type DocumentDetailResponse = {
  document: DocumentItem;
};

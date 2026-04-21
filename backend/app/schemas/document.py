from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DocumentItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    original_filename: str
    stored_filename: str
    content_type: str | None
    file_size: int
    storage_path: str
    status: str
    created_at: datetime
    updated_at: datetime


class DocumentUploadResponse(BaseModel):
    document: DocumentItem


class DocumentListResponse(BaseModel):
    items: list[DocumentItem]
    total: int


class DocumentDetailResponse(BaseModel):
    document: DocumentItem


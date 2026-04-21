from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.core.db import get_db
from app.models import Document
from app.schemas.document import (
    DocumentDetailResponse,
    DocumentItem,
    DocumentListResponse,
    DocumentUploadResponse,
)
from app.services.documents import save_upload_file

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post(
    "/upload",
    response_model=DocumentUploadResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> DocumentUploadResponse:
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename is required.",
        )

    content_type = file.content_type
    stored_filename, storage_path, file_size = await save_upload_file(file)

    document = Document(
        original_filename=file.filename,
        stored_filename=stored_filename,
        content_type=content_type,
        file_size=file_size,
        storage_path=storage_path,
        status="uploaded",
    )
    try:
        db.add(document)
        db.commit()
        db.refresh(document)
    except SQLAlchemyError as exc:
        db.rollback()
        Path(storage_path).unlink(missing_ok=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save document metadata.",
        ) from exc

    return DocumentUploadResponse(document=DocumentItem.model_validate(document))


@router.get("", response_model=DocumentListResponse)
def list_documents(db: Session = Depends(get_db)) -> DocumentListResponse:
    documents = db.scalars(
        select(Document).order_by(Document.created_at.desc(), Document.id.desc())
    ).all()
    items = [DocumentItem.model_validate(document) for document in documents]
    return DocumentListResponse(items=items, total=len(items))


@router.get("/{document_id}", response_model=DocumentDetailResponse)
def get_document(document_id: int, db: Session = Depends(get_db)) -> DocumentDetailResponse:
    document = db.get(Document, document_id)
    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document {document_id} was not found.",
        )
    return DocumentDetailResponse(document=DocumentItem.model_validate(document))

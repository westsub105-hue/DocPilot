import re
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.core.config import settings

_SAFE_FILENAME_PATTERN = re.compile(r"[^A-Za-z0-9._-]+")


def sanitize_filename(filename: str) -> str:
    name = Path(filename).name or "document"
    safe_name = _SAFE_FILENAME_PATTERN.sub("_", name).strip("._")
    return safe_name or "document"


async def save_upload_file(file: UploadFile) -> tuple[str, str, int]:
    upload_dir = settings.upload_dir_path
    upload_dir.mkdir(parents=True, exist_ok=True)

    sanitized_name = sanitize_filename(file.filename or "document")
    stored_filename = f"{uuid4().hex}_{sanitized_name}"
    destination = upload_dir / stored_filename

    size = 0
    with destination.open("wb") as output_file:
        while chunk := await file.read(1024 * 1024):
            size += len(chunk)
            output_file.write(chunk)

    await file.close()
    return stored_filename, str(destination), size


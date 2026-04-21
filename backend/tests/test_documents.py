def test_upload_list_and_get_document(client) -> None:
    file_bytes = b"%PDF-1.4\n%DocPilot test file\n"
    upload_response = client.post(
        "/api/v1/documents/upload",
        files={"file": ("sample.pdf", file_bytes, "application/pdf")},
    )

    assert upload_response.status_code == 201
    payload = upload_response.json()
    document = payload["document"]

    assert document["original_filename"] == "sample.pdf"
    assert document["content_type"] == "application/pdf"
    assert document["file_size"] == len(file_bytes)
    assert document["status"] == "uploaded"

    list_response = client.get("/api/v1/documents")
    assert list_response.status_code == 200
    list_payload = list_response.json()
    assert list_payload["total"] == 1
    assert list_payload["items"][0]["id"] == document["id"]

    detail_response = client.get(f"/api/v1/documents/{document['id']}")
    assert detail_response.status_code == 200
    detail_payload = detail_response.json()
    assert detail_payload["document"]["stored_filename"] == document["stored_filename"]

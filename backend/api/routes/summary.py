'''
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from api.dependencies.check_permissions import require_permission
from core.context import TenantContext
from core.embeddings import EmbeddingService
from core.retrieval import QdrantRetrievalService
from rag.service import get_llm

router = APIRouter(prefix="/summary", tags=["summary"])

class SummaryRequest(BaseModel):
    topic: str = Field(min_length=1, max_length=1000)
    limit: int = Field(default=6, ge=1, le=20)

@router.post("")
async def summarize(
    request: SummaryRequest,
    context: TenantContext = Depends(require_permission("query:run")),
) -> dict:
    vec = await EmbeddingService().embed_text(request.topic)
    chunks = await QdrantRetrievalService().search(context, vec, limit=request.limit)
    if not chunks:
        return {"summary": "No relevant documents found for this topic.", "source_count": 0}
    summary = await get_llm().generate(f"Summarise: {request.topic}", chunks)
    return {
        "summary": summary,
        "source_count": len(chunks),
        "sources": [{"document_name": c.metadata.get("document_name",""), "score": round(c.final_score,3)} for c in chunks],
    }

'''


from fastapi import APIRouter, Depends, File, UploadFile

from api.dependencies.check_permissions import require_permission
from core.context import TenantContext


router = APIRouter(prefix="/voice", tags=["voice"])


@router.post("/query")
async def voice_query(
    audio: UploadFile = File(...),
    context: TenantContext = Depends(require_permission("query:run")),
) -> dict:
    content = await audio.read()
    return {
        "org_id": context.org_id,
        "filename": audio.filename,
        "bytes_received": len(content),
        "transcript": "",
        "status": "received",
    }
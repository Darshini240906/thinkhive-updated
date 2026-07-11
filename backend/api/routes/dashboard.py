from fastapi import APIRouter, Depends
from api.dependencies.check_permissions import require_permission
from api.dependencies.get_database import DatabaseDependency
from core.context import TenantContext

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/metrics")
async def metrics(db: DatabaseDependency, context: TenantContext = Depends(require_permission("documents:read"))) -> dict:
    docs = await db["documents"].count_documents({"org_id": context.org_id, "status": {"$ne": "deleted"}})
    ready = await db["documents"].count_documents({"org_id": context.org_id, "status": "ready"})
    queries = await db["audit_logs"].count_documents({"org_id": context.org_id})
    logs = await db["audit_logs"].find({"org_id": context.org_id}).limit(100).to_list(100)
    avg_conf = sum(l.get("confidence", 0) for l in logs) / len(logs) if logs else 0
    members = await db["users"].count_documents({"org_id": context.org_id})
    domains = await db["domains"].count_documents({"org_id": context.org_id})
    return {"total_documents": docs, "indexed_documents": ready, "total_queries": queries,
            "avg_confidence": round(avg_conf, 3), "total_members": members, "total_domains": domains}

@router.get("/knowledge-map")
async def knowledge_map(db: DatabaseDependency, context: TenantContext = Depends(require_permission("documents:read"))) -> dict:
    docs = await db["documents"].find({"org_id": context.org_id, "status": "ready"}).limit(50).to_list(50)
    nodes = [{"id": str(d["_id"]), "label": d.get("filename",""), "weight": d.get("document_weight",1.0),
               "usage_tag": d.get("usage_tag","unused"), "query_count": d.get("query_count",0)} for d in docs]
    return {"nodes": nodes}

@router.get("/gaps")
async def gaps(db: DatabaseDependency, context: TenantContext = Depends(require_permission("documents:read"))) -> list:
    logs = await db["audit_logs"].find({"org_id": context.org_id, "confidence_label": "low"}).limit(20).to_list(20)
    return [{"query": l.get("query",""), "confidence": l.get("confidence",0)} for l in logs]

@router.get("/insights")
async def insights(db: DatabaseDependency, context: TenantContext = Depends(require_permission("documents:read"))) -> list:
    docs = await db["documents"].find({"org_id": context.org_id, "freshness_tag": {"$in": ["stale","expired"]}}).limit(10).to_list(10)
    return [{"type": "stale", "message": f"'{d.get('filename')}' may be outdated", "document_id": str(d["_id"])} for d in docs]

@router.get("/gap-analysis")
async def gap_analysis(db: DatabaseDependency, context: TenantContext = Depends(require_permission("documents:read"))) -> dict:
    domains = await db["domains"].find({"org_id": context.org_id}).to_list(100)
    domain_names = {str(d["_id"]): d["name"] for d in domains}

    results = []
    for d in domains:
        did = str(d["_id"])
        total = await db["audit_logs"].count_documents({"org_id": context.org_id, "domain_id": did})
        low = await db["audit_logs"].count_documents({"org_id": context.org_id, "domain_id": did, "confidence_label": "low"})
        coverage = round(100 * (1 - low / total)) if total else None
        severity = "no-data"
        if coverage is not None:
            severity = "critical" if coverage < 40 else "high-risk" if coverage < 60 else "healthy"
        results.append({
            "domain_id": did, "name": d["name"], "domain_type": d.get("domain_type", "custom"),
            "coverage": coverage, "total_queries": total, "low_confidence_queries": low,
            "severity": severity,
        })

    covered = [r["coverage"] for r in results if r["coverage"] is not None]

    # Flat, real list of individual "couldn't find it" moments — each low-confidence
    # query the org has ever run, most recent first. This is what actually populates
    # the Gap Analysis list in the UI.
    gap_logs = await db["audit_logs"].find(
        {"org_id": context.org_id, "confidence_label": "low"}
    ).sort("created_at", -1).limit(50).to_list(50)

    recent_gaps = []
    for l in gap_logs:
        did = l.get("domain_id")
        confidence_pct = round((l.get("confidence") or 0) * 100)
        recent_gaps.append({
            "id": str(l["_id"]),
            "query": l.get("query", ""),
            "domain_name": domain_names.get(did, "General / org-wide"),
            "confidence": confidence_pct,
            "severity": "critical" if confidence_pct < 30 else "high-risk",
            "created_at": l.get("created_at"),
        })

    return {
        "domains": results,
        "recent_gaps": recent_gaps,
        "avg_coverage": round(sum(covered) / len(covered)) if covered else 0,
        "critical_count": sum(1 for r in results if r["severity"] == "critical"),
        "high_risk_count": sum(1 for r in results if r["severity"] == "high-risk"),
        "domains_analyzed": len(covered),
        "total_domains": len(results),
        "total_gaps": len(recent_gaps),
    }
from __future__ import annotations
from datetime import UTC, datetime
from config import settings
from core.enums import AgeTag


def _aware(dt: datetime) -> datetime:
    return dt if dt.tzinfo else dt.replace(tzinfo=UTC)


def compute_age_tag(
    doc_created_at: datetime,
    org_created_at: datetime | None,
    now: datetime | None = None,
) -> AgeTag:
    """
    Tags a document new/recent/old/outdated based on *when it was uploaded
    relative to how long the company has been using ThinkHive* — not a fixed
    number of days. A doc uploaded in an org's first week means something
    different for a company that signed up two weeks ago vs. one that's been
    on the platform for three years.

    position = 0   -> uploaded today
    position = 1   -> uploaded the day the org joined ThinkHive
    """
    now = _aware(now) if now else datetime.now(UTC)
    doc_created_at = _aware(doc_created_at)
    org_created_at = _aware(org_created_at) if org_created_at else doc_created_at

    org_lifetime = (now - org_created_at).total_seconds()
    doc_age = (now - doc_created_at).total_seconds()

    # Company hasn't been around long enough (e.g. same-day signup) to judge
    # anything as relatively "old" yet — everything is new.
    if org_lifetime < 86400:
        return AgeTag.NEW

    position = max(0.0, min(1.0, doc_age / org_lifetime))

    if position <= settings.age_new_threshold:
        return AgeTag.NEW
    if position <= settings.age_recent_threshold:
        return AgeTag.RECENT
    if position <= settings.age_old_threshold:
        return AgeTag.OLD
    return AgeTag.OUTDATED
"""
Alembic migration for materialized view: latest_product_snapshots
"""
from alembic import op

revision = 'add_latest_product_snapshots_mv'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.execute('''
    CREATE MATERIALIZED VIEW IF NOT EXISTS latest_product_snapshots AS
    SELECT ps.*,
      (
        COALESCE(ps.review_count, 0) * 0.4
        + COALESCE(NULLIF(regexp_replace(ps.rating, '[^0-9.]', '', 'g'), ''), '0')::float * 10
        + (5 - COALESCE(NULLIF(regexp_replace(ps.rank, '[^0-9.]', '', 'g'), ''), '5')::float) * 2
        + (
          CASE 
            WHEN ps.captured_at >= now() - interval '1 day' THEN 10
            WHEN ps.captured_at >= now() - interval '3 day' THEN 5
            WHEN ps.captured_at >= now() - interval '7 day' THEN 2
            ELSE 0
          END
        )
      ) AS score
    FROM product_snapshots ps
    INNER JOIN (
        SELECT product_id, MAX(captured_at) AS max_captured
        FROM product_snapshots
        GROUP BY product_id
    ) latest
    ON ps.product_id = latest.product_id AND ps.captured_at = latest.max_captured;
    ''')

def downgrade():
    op.execute('DROP MATERIALIZED VIEW IF EXISTS latest_product_snapshots;')

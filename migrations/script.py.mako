"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime
import webapp2.extensions.database
from sqlalchemy import orm
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def get_session():
    bind = op.get_bind()
    return orm.Session( bind = bind )


def upgrade():
    ${upgrades if upgrades else "pass"}
    session = get_session()

    return


def downgrade():
    ${downgrades if downgrades else "pass"}
    return
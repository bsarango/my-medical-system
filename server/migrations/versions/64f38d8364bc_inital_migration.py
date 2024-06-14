"""Inital Migration

Revision ID: 64f38d8364bc
Revises: 
Create Date: 2024-06-14 10:35:31.523195

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '64f38d8364bc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('dob', sa.Date(), nullable=False),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_patients'))
    )
    op.create_table('physicians',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('specialty', sa.String(), nullable=True),
    sa.Column('office_address', sa.String(), nullable=False),
    sa.Column('office_number', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_physicians')),
    sa.UniqueConstraint('office_number', name=op.f('uq_physicians_office_number')),
    sa.UniqueConstraint('username', name=op.f('uq_physicians_username'))
    )
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('time', sa.String(), nullable=False),
    sa.Column('details', sa.String(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('physician_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], name=op.f('fk_appointments_patient_id_patients')),
    sa.ForeignKeyConstraint(['physician_id'], ['physicians.id'], name=op.f('fk_appointments_physician_id_physicians')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_appointments'))
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(), nullable=True),
    sa.Column('complete', sa.Boolean(), nullable=True),
    sa.Column('details', sa.String(), nullable=False),
    sa.Column('timeStamp', sa.String(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=True),
    sa.Column('physician_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['patients.id'], name=op.f('fk_orders_patient_id_patients')),
    sa.ForeignKeyConstraint(['physician_id'], ['physicians.id'], name=op.f('fk_orders_physician_id_physicians')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_orders'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('orders')
    op.drop_table('appointments')
    op.drop_table('physicians')
    op.drop_table('patients')
    # ### end Alembic commands ###

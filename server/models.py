from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import bcrypt

from config import db

class Physician(db.Model, SerializerMixin):
    __tablename__ = "physicians"

    id = db.Column(db.Integer, primary_key=True)


class Patient(db.Model, SerializerMixin):
    __tablename__="patients"

    id = db.Column(db.Integer, primary_key=True)


class Appointment(db.Model, SerializerMixin):
    __tablename__="appointments"

    id = db.Column(db.Integer, primary_key=True)


class Order(db.Model, SerializerMixin):
    __tablename__="orders"

    id = db.Column(db.Integer, primary_key=True)
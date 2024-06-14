from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import bcrypt

from config import db

class Physician(db.Model, SerializerMixin):
    __tablename__ = "physicians"

class Patient(db.Model, SerializerMixin):
    __tablename__="patients"

class Appointment(db.Model, SerializerMixing):
    __tablename__="appointments"

class Orders(db.Model, SerializerMixin):
    __tablename__="orders"
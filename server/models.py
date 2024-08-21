from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import bcrypt
from datetime import date

from config import db

class Physician(db.Model, SerializerMixin):
    __tablename__ = "physicians"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable = False)
    _password_hash = db.Column(db.String, nullable = False)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    specialty = db.Column(db.String)
    office_address = db.Column(db.String, nullable = False)
    office_number = db.Column(db.String, unique = True, nullable = False)

    @validates('username')
    def validate_username(self, key, username):
        if len(username)<7:
            raise ValueError("Username not long enough. Enter a username of 8 characters or longer")

        return username
    
    @validates('first_name')
    def validate_name(self, key, first_name):
        invalid_characters = ['!@#$%^&*()_+-=[]\}{><?/|1234567890']
        for c in invalid_characters:
            if c in first_name:
                raise ValueError("Invalid name. No numbers or special characters!")
            
        return first_name

    @validates('last_name')
    def validate_name(self, key, last_name):
        invalid_characters = ['!@#$%^&*()_+-=[]\}{><?/|1234567890']
        for c in invalid_characters:
            if c in last_name:
                raise ValueError("Invalid name. No numbers or special characters!")
            
        return last_name

    @validates('specialty')
    def validate_specialty(self, key, specialty):
        specialties = ['primary care', 'cardiology', 'nephrology', 'obstetrics and gynecology', 'pulmonary', 'neurology', 'endocrinology', 'dermatology', 'pediatrics']
        
        if specialty not in specialties and specialty != None:
            raise ValueError("Invalid specialty for practice. Enter again")

        return specialty

    @validates('office_number')
    def validate_office_number(self, key, office_number):
        if len(office_number)!=10:
            raise ValueError("Invalid number, its not 10 digits")

        digits_for_number = '0123456789'
        for d in office_number:
            if d not in digits_for_number:
                raise ValueError("Invalid number. Only digits allowed")

        return office_number

    appointments = db.relationship('Appointment', back_populates='physician', cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='physician', cascade='all, delete-orphan')

    serialize_rules = ('-appointments.physician','-orders.physician')

    def __repr__(self):
	    return f'Physician Name: {self.first_name} {self.last_name}'

    @hybrid_property
    def password_hash(self):
	    raise AttributeError("Cannot access password")
		
    @password_hash.setter
    def password_hash(self, password):
	    password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))

	    self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))


class Patient(db.Model, SerializerMixin):
    __tablename__="patients"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    dob = db.Column(db.Date, nullable = False)
    address = db.Column(db.String)
    phone_number = db.Column(db.String)


    @validates('first_name')
    def validate_name(self, key, first_name):
        invalid_characters = ['!@#$%^&*()_+-=[]\}{><?/|1234567890']
        for c in invalid_characters:
            if c in first_name:
                raise ValueError("Invalid name. No numbers or special characters!")
            
        return first_name

    @validates('last_name')
    def validate_name(self, key, last_name):
        invalid_characters = ['!@#$%^&*()_+-=[]\}{><?/|1234567890']
        for c in invalid_characters:
            if c in last_name:
                raise ValueError("Invalid name. No numbers or special characters!")
            
        return last_name

    @validates('dob')
    def validate_dob(self, key, dob):
        print(type(dob))
        today = date.today()
        valid_date = date(today.year-18, today.month, today.day)
        if dob >= valid_date:
            raise ValueError("Invalid date, the user must be 18 years or older. Must put in another date of birth")

        return dob
    
    @validates('phone_number')
    def validate_phone_nunmber(self, key, phone_number):
        
        if phone_number != None: 
            if len(phone_number) != 10:
                raise ValueError("Invalid number, its not 10 digits")
            digits_for_number = '0123456789'
            for digit in phone_number:
                if digit not in digits_for_number:
                    raise ValueError("Invalid number. Only digits allowed")

        return phone_number

    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='patient', cascade='all, delete-orphan')

    serialize_rules = ('-appointments.patient','-orders.patient')

    def __repr__(self):
        return f'Patient Name: {self.first_name} {self.last_name}'


class Appointment(db.Model, SerializerMixin):
    __tablename__="appointments"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable = False)
    date = db.Column(db.Date, nullable = False)
    time = db.Column(db.String, nullable=False) #Make validation to make sure 24 hr time
    details = db.Column(db.String, nullable= False)


    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    physician_id=db.Column(db.Integer, db.ForeignKey('physicians.id'))

    physician = db.relationship('Physician', back_populates='appointments')
    patient = db.relationship('Patient', back_populates='appointments')

    serialize_rules = ('-physician.appointments','-patient.appointments')

    @validates('time')
    def validate_time(self, key, time):

        print(time)
        hr_min = time.split('-')
        print(hr_min)
        if 9<=int(hr_min[0])<=17:
            if 0<=int(hr_min[1])<60:
                return time

        raise ValueError("Invalid time for an appointment. Must be between 9am and 5pm")

    def __repr__(self):
        return f'Appointment: {self.title}'

class Order(db.Model, SerializerMixin):
    __tablename__="orders"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String)
    complete = db.Column(db.Boolean)
    details = db.Column(db.String, nullable=False)
    timeStamp = db.Column(db.String, nullable=False)

    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    physician_id=db.Column(db.Integer, db.ForeignKey('physicians.id'))

    @validates('category')
    def validate_category(self,key,category):
        types = ['medication', 'therapy', 'scan', 'other', 'test', 'labs', 'discontinue']
        if category not in types:
            raise ValueError("Invalid order type")

        return category

    physician = db.relationship('Physician', back_populates='orders')
    patient = db.relationship('Patient', back_populates='orders')

    serialize_rules = ('-physician.orders','-patient.orders')

    def __repr__(self):
        return f'Order: {self.order}'
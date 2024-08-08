from flask import request, session, send_from_directory
from flask_restful import Resource
from config import api, db, app
from datetime import datetime

from models import Physician, Patient, Appointment, Order


@app.route("/")
def index():
    def get():
        return send_from_directory("../client","index.html")

@app.before_request
def check_if_logged_in():
    open_access_list=[
        'signup',
        'login',
        'check_session',
    ]
    if request.endpoint not in open_access_list and (not session.get('physician_id')):
        return {'error':'Patient not authorized'}, 401

class PhysiciansById(Resource):

    def get(self, id):
        if session.get('physician_id'):

            physician = Physician.query.filter_by(id=id).first()

            if physician:
                return physician.to_dict(), 200

        return {"message":"Physician not logged in. Please log in to continue"}, 401

class Patients(Resource):

    def get(self):

        if session.get('physician_id'):
            patients = [patient.to_dict() for patient in Patient.query.all()]
            return patients, 200

        return {'message': 'Physician not logged in, please login to continue'}, 401

class Appointments(Resource):

    def get(self):
        if session.get('physician_id'):
            appointments = [appointment.to_dict() for appointment in Appointment.query.filter(Appointment.physician_id==session.get('physician_id')).all()]
            return appointments, 200

        return {'message': 'Physician not logged in, please login to continue'}, 401

    def post(self):
        if session.get('physician_id'):
            json = request.get_json()

            #Get format for date and time to be like this
            appoint_date= '05-04-2024'
            appoint_time= '1300'

            new_appointment = Appointment(title=json.get('title'), date=appoint_date, time=appoint_time, details=json.get('details'), patient_id=json.get('patientId'), physician_id=session.get('physician_id'))

class Orders(Resource):

    def get(self):
        if session.get('physician_id'):
            orders = [order.to_dict() for order in Order.query.filter(Order.physician_id == session.get('physician_id')).all()]
            return orders, 200

    def post(self):
        if session.get('physician_id'):
            json = request.get_json()
            time_stamp_string = (datetime.now()).strftime("%Y-%b-%a-%X")

            new_order = Order(category=json.get('category'), complete=json.get('complete'), details=json.get('details'), timeStamp=time_stamp_string, physician_id=session.get('physician_id'), patient_id = json.get('patient'))

            try:
                db.session.add(new_order)
                db.session.commit()
                return new_order.to_dict(), 201
            
            except ValueError:
                return {'error': 'Invalid input made to order. Try again.'}, 400

        return {'message':'Physician not logged in. Please log in to make an appointment!'}, 401

class OrdersById(Resource):

    def patch(self, id):
        if session.get('physician_id'):
            json = request.get_json()

            order = Order.query.filter(Order.id == id).first()

            order.category = json.get('category')
            order.complete = json.get('complete')
            order.details = json.get('details')

            try:
                db.session.add(order)
                db.session.commit()

                return order.to_dict(), 200
            except ValueError:
                return {'error':'Invalid inputs to the order given. Try again.'}, 400

        return {'message':'Physician not logged in. Please login to update the appointment'}, 401

    def delete(self, id):
        if session.get('physician_id'):
            order = Order.query.filter(Order.id == id).first()

            if order:
                db.session.delete(order)
                db.session.commit()
                return {'message' :''}, 200

            return {"error":"Order not found. Try again"}, 404

        return {'message':'Physician not logged in. Please login to cancel the order'}, 401

class CheckSession(Resource):
    
    def get(self):
        physician_id = session.get('physician_id')

        if physician_id:
            physician = Physician.query.filter(Physician.id == physician_id).first()
            return physician.to_dict(), 200
            
        return {'error':'Physician not signed in. Please sign in.'} , 401

class SignUp(Resource):
    
    def post(self):
        json = request.get_json()
        
        new_physician = Physician(
					username= json.get('username'), 
                    first_name = json.get('firstName'), 
                    last_name = json.get('lastName'), 
                    specialty = json.get('specialty'),
                    office_address=json.get('officeAddress'), 
                    office_number=json.get('officeNumber')
                    )

        new_physician.password_hash = json.get('password')
    
        try:   
            db.session.add(new_physician)
            db.session.commit()
            return new_physician.to_dict(), 201

        except ValueError:
            return {'error':'Error in entering information. Try again'}, 422

class Login(Resource):

    def post(self):
        json = request.get_json()   
        username = json.get('username')
        physician = Physician.query.filter(Physician.username == username).first()
        password = json.get('password')
		
        if physician:
            if physician.authenticate(password):
                session['physician_id'] = physician.id
                return physician.to_dict(), 201

        return {'message': 'Invalid credentials, Try logging in again'}, 401

class Logout(Resource):
    
    def delete(self):
        physician = Physician.query.filter(Physician.id == session.get('physician_id')).first()

        if physician:
            session['physician_id'] = None
            return {'message':''}, 204
            
        return {'error': 'Unable to log out. Physician not logged in'}, 401

api.add_resource(PhysiciansById, "/physicians/<int:id>", endpoint = "physician")
api.add_resource(Patients, "/patients", endpoint="patients")
api.add_resource(Appointments, "/appointments", endpoint="appointments")
api.add_resource(Orders, "/orders", endpoint="orders")
api.add_resource(OrdersById, "/orders/<int:id>", endpoint="order")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(SignUp, "/signup", endpoint="signup")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
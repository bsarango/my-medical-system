from flask import request, session
from flask_restful import Resource
from config import api, db, app

from models import Physician, Patient, Appointment, Order


@app.route("/")
def index():
    return '<h1>Phase 5</h1>'



if __name__ == '__main__':
    app.run(debug=True, port=5555)
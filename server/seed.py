from config import app, db
from models import Physician, Patient, Appointment, Order
from datetime import date, datetime

if __name__ == '__main__':

    with app.app_context():

        print('Clearing db ...')
        
        Physician.query.delete()
        Patient.query.delete()
        Appointment.query.delete()
        Order.query.delete()

        print("Starting Seed...")

        print("Seeding Physicians")

        username_1 = "bsmith12345"
        password_1 = "iamadoctor12345"
        first_name_1 = "Brandon"
        last_name_1 = "Smith"
        specialty_1 = "primary care"
        office_address_1 = "500 Broadway Avenue New York, New York 10050"
        office_number_1 = '2128008000'

        physician_1 = Physician(username=username_1, first_name=first_name_1, last_name=last_name_1, specialty=specialty_1, office_address=office_address_1, office_number=office_number_1)

        physician_1.password_hash=password_1

        db.session.add(physician_1)
        db.session.commit()

        username_2 = "jdoemd54321"
        password_2 = "bestdoctor!"
        first_name_2 = "Jane"
        last_name_2 = "Doe"
        specialty_2 = "pediatrics"
        office_address_2 = "200 Main Street Queens, New York 12150"
        office_number_2 = '3471112000'

        physician_2 = Physician(username=username_2, first_name=first_name_2, last_name=last_name_2, specialty=specialty_2, office_address=office_address_2, office_number=office_number_2)

        physician_2.password_hash=password_2

        db.session.add(physician_2)
        db.session.commit()

        print("Seeding Patients")

        p_first_name_1 = "Bob"
        p_last_name_1 = "Jones"
        dob_1 = date(1990, 1, 1)
        address_1 = "52 Melrose Avenue Orange New Jersey"
        phone_number_1 = "3479005000"

        patient_1 = Patient(first_name=p_first_name_1,last_name=p_last_name_1,dob=dob_1,address=address_1,phone_number=phone_number_1)

        db.session.add(patient_1)
        db.session.commit()

        p_first_name_2 = "Anna"
        p_last_name_2 = "Singh"
        dob_2 = date(1985, 6, 4)
        address_2 = "570 Busy Drive Baltimore Maryland"
        phone_number_2 = "3478712000"

        patient_2 = Patient(first_name=p_first_name_2,last_name=p_last_name_2,dob=dob_2,address=address_2,phone_number=phone_number_2)

        db.session.add(patient_2)
        db.session.commit()

        print("Seeding Appointments")

        title_1 = "Wound Checkup and Wash"
        date_1 = date(2024, 6, 19)
        time_1 = "15-30"
        details_1 = "Check on patient wound post surgery. Remove any unneccessary bandages and clean wound with saline. Apply needed care to prevent infection"

        appointment_1 = Appointment(title=title_1, date=date_1, time=time_1,details=details_1)

        db.session.add(appointment_1)
        db.session.commit()

        title_2 = "Yearly Checkup"
        date_2 = date(2024, 7, 2)
        time_2 = "12-30"
        details_2 = "Perform routine check up on patient. Give annual shots if due"

        appointment_2 = Appointment(title=title_2, date=date_2, time=time_2,details=details_2)

        db.session.add(appointment_2)
        db.session.commit()

        print("Seeding Orders")

        category_1 = "test"
        complete_1 = False
        details_1 = "Perform EKG on patient. Send to EMR for review by Physician"
        timeStamp_1 = (datetime.now()).strftime("%Y-%b-%a-%X")

        order_1 = Order(category=category_1, complete=complete_1, details=details_1, timeStamp=timeStamp_1)

        db.session.add(order_1)
        db.session.commit()

        cateogry_2 = "medication"
        complete_2 = True
        details_2 = "Give 25mg of metropolol to patient to lower blood pressure. Monitor patient 15 minutes post administration"
        timeStamp_2 = (datetime.now()).strftime("%Y-%b-%a-%X")

        order_2 = Order(category=cateogry_2, complete=complete_2, details=details_2, timeStamp=timeStamp_2)

        db.session.add(order_2)
        db.session.commit()
        





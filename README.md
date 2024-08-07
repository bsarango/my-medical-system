# MY MEDICAL CENTRAL SYSTEM

# APPLICATION DESCRIPTION
This is a a system designed similarly to what modern healthcare professionals use in the healthcare field to manage their patient's orders and appointments linked to them. The application limits use to those that have a valid account - aimed towards Physicians and other healthcare professionals capable of submitting orders. The application creates, manages, and removes orders for patients given the preset options for the user as well as displays appointments and the related information for given patients

# Project Installation and Setup
For the repository for the project click the following link:https://github.com/bsarango/my-medical-system/tree/master

Click on Fork and follow the instructions given.

Click on code and copy the repo in the SSH format

To clone to your system, open a window in terminal to a directory that you wish to clone to. Enter the following:

```
    git clone https://github.com/bsarango/my-medical-system.git
```

Enter the directory of the project and enter the following for the front end and back end installation in two seperate terminals:

Front End
```
    npm install --prefix client
```

Back End
```
    pipenv install
    pipenv shell 
```

To run the application, run the following in the first terminal window where the front end was installed
```
    npm run dev --prefix client
```

Run the following in the second terminal where the backend was installed
```
    cd server
    python app.py
```

# Program Contents
The application has a front end run by React.js by Vite and uses BootStrap 5 and React BootStrap to manage the UI and properties of the components and pages. All of the front end files are found in the client directory.

The backend uses Flask with Python and has all of the respective files in the server directory. The database uses SQL Alchemy and stores all of the data mapped locally.



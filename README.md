Indigo Case Study - Backend Solution

Overview
This project is a backend solution for a case study provided by Indigo. It is built using Node.js and incorporates several packages to enhance functionality.

Tech Stack

Node.js: The primary technology used.

Express: A Node.js framework for building web applications.

PostgreSQL: The database used for storing data.

Sequelize: An ORM for PostgreSQL, used to manage database interactions.

Nodemailer: For sending emails.

firebase-admin: 

Twilio: For sending text message notifications.

Cron: For scheduling tasks.

Jsonwebtoken: For handling JSON Web Tokens (JWT) in authentication.

Nodemon: For automatically restarting the application during development.

cors





Features

APIs:

-Create user

-Login

-Add/update flights

-Show all flight listings

-Create notifications for opted-in users



Notification System:
-When there is any change in a flight, a notification is created for users who have opted in.

-A cron job runs every minute to check for any pending notifications.

-Notifications are sent to users based on their preference:

-Email Notifications: Sent using Nodemailer.

-Text Notifications: Sent using Twilio.


Usage

-API Endpoints: The project uses Express to define API endpoints. Ensure your frontend or other services are configured to communicate with these endpoints.

-Authentication: Jsonwebtoken is used to manage authentication. Ensure you have the necessary JWT configurations in place.

-Email Notifications: Nodemailer is used for sending email notifications. Ensure you have your email service credentials configured correctly.

-Scheduled Tasks: Cron is used for scheduling tasks such as sending periodic notifications.

-SMS Notifications: Twilio is used for sending text message notifications. Ensure you have your Twilio credentials configured correctly.

-Database: using postgres with sequalize to made migrations and seed to crate tables and to add initial data to user table (admin)


SENDS NOTIFICATIONS LIKE THIS :-

DEVICE: 
![Screenshot (2)](https://github.com/user-attachments/assets/a46389cd-5715-4def-88c8-1dc016f0f784)
![Screenshot (3)](https://github.com/user-attachments/assets/0a4cf089-9a45-49c0-bdef-ba5158246af8)

TEXT:
![1](https://github.com/user-attachments/assets/ed8a0c3e-8b82-41b7-a158-7e12082b58ad)

EMAIL: 
![image](https://github.com/user-attachments/assets/e1fb832c-8fda-4460-a5bd-4f388db7f5fa)



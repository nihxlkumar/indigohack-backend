
# Indigo Case Study 

This project is a backend solution for a case study from Indigo. It displays flights and sends notifications for flight status changes via SMS, email, or app notifications.


## Tech Stack

**Node.js:** The primary technology used.

**Express:** A Node.js framework for building web applications.

**PostgreSQL:** The database used for storing data.

**Sequelize:** An ORM for PostgreSQL, used to manage database interactions.

**Nodemailer:** For sending emails.

**Firebase-admin:** For managing Firebase services.

**Twilio:** For sending text message notifications.

**Cron:** For scheduling tasks.

**Jsonwebtoken:** For handling JSON Web Tokens (JWT) in authentication.

**Nodemon:** For automatically restarting the application during development.

**Cors:** For enabling Cross-Origin Resource Sharing.


## Features

- APIs:

  - Create/Login user

  - Add/update flights.

  - Show all flight listings.

  - Create notifications for opted-in users.


- Notification System:
  - When there is any change in a flight, a notification is created for users who have opted in.

  - A cron job runs every minute to check for notifications to send.

  - Notifications are sent to users based on their preference:

  - Device Notifications: Sent using Firebase.
  
  - Email Notifications: Sent using Nodemailer.

  - Text Notifications: Sent using Twilio.


- Usage

  - API Endpoints: The project uses Express to define API endpoints.

  - Authentication: Jsonwebtoken is used to manage authentication.

  - Email Notifications: Nodemailer is used for sending email notifications.

  - Device Notifications: Firebase is used for sending device push notifications.

  - SMS Notifications: Twilio is used for sending text message notifications.

  - Scheduled Tasks: Cron is used for scheduling tasks for sending periodic notifications.

  - Database: Postgres is used with Sequelize to make migrations and seed to create tables and add initial data to the user table (admin).
## Screenshots

- On update in flight it sends notifications to opt-in users.
  - Device notification
![App Screenshot](https://github.com/user-attachments/assets/276a24b7-5d5a-4139-809d-6b685d483b61)

![App Screenshot](https://github.com/user-attachments/assets/0a4cf089-9a45-49c0-bdef-ba5158246af8)


  - Text notification
![App Screenshot](https://github.com/user-attachments/assets/acdaa54a-3811-40c3-9333-163c0e02ebb6)

  - Email notification
![App Screenshot](https://github.com/user-attachments/assets/05a70509-3171-4648-b166-af1516f171fa)






## Frontend Link

[https://github.com/nihxlkumar/indigohack-frontend](https://github.com/nihxlkumar/indigohack-frontend)


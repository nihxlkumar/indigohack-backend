import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.TWILIO_PHONE;
const client = twilio(accountSid, authToken);

const sendSMS = (to, body) => {
  return client.messages.create({
    body,
    from: phone,
    to,
  });
};

export default sendSMS;

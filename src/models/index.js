import sequelize from '../config/database.js';
import Users from './users.js'
import Flights from './flights.js'
import Notifications from './notifications.js'
import ActiveNotifications from './active-notifications.js';

const models = {
  Users,
  Flights,
  Notifications,
  ActiveNotifications
};

export { sequelize };
export default models;

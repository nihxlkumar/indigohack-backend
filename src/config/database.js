import { Sequelize } from 'sequelize';

const development = {
    username: 'postgres',
    password: 'postgres',
    database: 'indigo',
    host: 'localhost',
    dialect: 'postgres',
};

const local = {
    username: 'postgres',
    password: 'postgres',
    database: 'indigo',
    host: 'localhost',
    dialect: 'postgres',
};

const environmnet = process.env.NODE_ENV === "local" ? local : development;

const sequelize = new Sequelize(environmnet.database, environmnet.username, environmnet.password, {
    host: environmnet.host,
    dialect: environmnet.dialect,
    logging: false,
});

export default sequelize;

import path from 'path';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config()

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.js'))[env];

const sequelize = new Sequelize(config);

export const connect =()=>{
  sequelize
  .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.', `database: ${config.database}`)
    })
    .catch((err: Error) => {
      console.error('Unable to connect to the database:', err)
})
}
export default sequelize;
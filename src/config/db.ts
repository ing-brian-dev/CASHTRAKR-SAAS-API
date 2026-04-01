import { Sequelize } from "sequelize-typescript";
import colors from "colors";

const db = new Sequelize(process.env.DATABASE_URL, {
  models: [__dirname + '/../models/**/*'],
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
  logging: false,
  define: {
    timestamps: true
  }
});

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Database connection succesfully"));
  } catch (error) {
    console.log(error);
  }
}

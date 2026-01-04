import User from "./database/models/user.model.ts";
import {sequelize} from "./config/db.ts";

async function test() {
  try {
    await sequelize.authenticate();

    const newUser = await User.create({
      full_name: "Test User",
      email: "test@example.com",
      password: "123456",
    });

    console.log("Inserted user:", newUser.toJSON());
  } catch (err) {
    console.error("Error:", err);
  }
}

test();

import sequelize from "../../config/db.ts";
import { initUserModel } from "./user.model.ts";
import { initSongModel } from "./songs.model.ts";

export const initModels = () => {
    initUserModel(sequelize);
    initSongModel(sequelize);



}
// // Associations

// User.hasMany(Song, {
//   foreignKey: "user_id",
//   as: "songs",
//   onDelete: "CASCADE",
// });

// Song.belongsTo(User, {
//   foreignKey: "user_id",
//   as: "user",
// });

// export { User, Song };

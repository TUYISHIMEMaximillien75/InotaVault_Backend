import { DataTypes, Model, Sequelize, type Optional } from "sequelize";

interface UserAttributes {
    id: string;
    full_name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes,
    "id" | "role" | "created_at" | "updated_at"
> { }
export class User extends Model<UserAttributes, UserCreationAttributes> { }


export const initUserModel = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // Model-level default
                primaryKey: true,
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "singer",
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")

            },
        },
        {
            sequelize, // I'll deal with this mukanya
            tableName: "users",
            modelName: "User",
            createdAt: "created_at",
            updatedAt: "updated_at",
            timestamps: true,
        }
    );

}
export default User;
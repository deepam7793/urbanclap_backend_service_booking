import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";
import { ProviderAttributes } from "../utils/interface";

type ProviderCreationAttributes = Optional<ProviderAttributes, "id" | "rating">;

class Provider
  extends Model<ProviderAttributes, ProviderCreationAttributes>
  implements ProviderAttributes
{
  public id!: number;
  public userId!: number;
  public bio!: string;
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Provider.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bio: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 5 },
  },
  { sequelize, modelName: "Provider" }
);

Provider.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Provider, { foreignKey: "userId" });

export default Provider;

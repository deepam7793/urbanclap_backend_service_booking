import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Provider from "./provider";
import { OfferingAttributes } from "../utils/interface";

type OfferingCreationAttributes = Optional<OfferingAttributes, "id">;

class Offering
  extends Model<OfferingAttributes, OfferingCreationAttributes>
  implements OfferingAttributes
{
  public id!: number;
  public providerId!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public duration!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Offering.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    providerId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false }, // minutes
  },
  { sequelize, modelName: "Offering" }
);

Offering.belongsTo(Provider, { foreignKey: "providerId" });
Provider.hasMany(Offering, { foreignKey: "providerId" });

export default Offering;

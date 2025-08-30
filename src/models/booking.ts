import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";
import Provider from "./provider";
import Offering from "./offering";
import { BookingStatus } from "../utils/enum";
import { BookingAttributes } from "../utils/interface";

type BookingCreation = Optional<BookingAttributes, "id" | "status">;

class Booking
  extends Model<BookingAttributes, BookingCreation>
  implements BookingAttributes
{
  public id!: number;
  public userId!: number;
  public providerId!: number;
  public offeringId!: number;
  public status!: BookingStatus;
  public date!: Date;
  public time!: string;
}

Booking.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    providerId: { type: DataTypes.INTEGER, allowNull: false },
    offeringId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM(...Object.values(BookingStatus)),
      defaultValue: BookingStatus.Pending,
    },
    date: { type: DataTypes.DATE, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Booking" }
);

Booking.belongsTo(User, { foreignKey: "userId" });
Booking.belongsTo(Provider, { foreignKey: "providerId" });
Booking.belongsTo(Offering, { foreignKey: "offeringId" });

export default Booking;

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Booking from "./booking";
import User from "./user";

interface ReviewAttributes {
  id: number;
  bookingId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ReviewCreationAttributes = Optional<ReviewAttributes, "id">;

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public bookingId!: number;
  public userId!: number;
  public rating!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bookingId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: "Review" }
);

Review.belongsTo(Booking, { foreignKey: "bookingId" });
Review.belongsTo(User, { foreignKey: "userId" });

Booking.hasOne(Review, { foreignKey: "bookingId" });
User.hasMany(Review, { foreignKey: "userId" });

export default Review;

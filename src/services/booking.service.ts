import Booking from "../models/booking";
import { BookingStatus } from "../utils/enum";
import { CAN_TRANSITION } from "../utils/constant";

class BookingService {
  async createBooking(
    userId: number,
    providerId: number,
    offeringId: number,
    date: Date,
    time: string
  ) {
    return await Booking.create({
      userId,
      providerId,
      offeringId,
      date,
      time,
      status: BookingStatus.Pending,
    });
  }

  async getBookingById(id: number) {
    return await Booking.findByPk(id);
  }

  async getBookingsByUser(userId: number) {
    return await Booking.findAll({ where: { userId } });
  }

  async updateBookingStatus(
    bookingId: number,
    providerId: number,
    newStatus: BookingStatus
  ) {
    const booking = await Booking.findByPk(bookingId);
    //console.log("======>",booking?.dataValues?.providerId, providerId);
    if (!booking) throw new Error("Booking not found");

    if (booking?.dataValues?.providerId !== providerId) {
      throw new Error("You are not authorized to update this booking");
    }
    const allowed =
      CAN_TRANSITION[booking?.dataValues?.status as BookingStatus];
    //console.log(allowed)
    if (!allowed.includes(newStatus)) {
      throw new Error(
        `Invalid transition from ${booking?.dataValues?.status} to ${newStatus}`
      );
    }

    booking.set("status", newStatus);
    await booking.save();

    return booking;
  }
}

export const bookingService = new BookingService();

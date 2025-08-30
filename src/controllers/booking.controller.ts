import { Request, Response } from "express";
import { bookingService } from "../services/booking.service";
import { BookingStatus } from "../utils/enum";

export class BookingController {
  create = async (req: Request, res: Response) => {
    try {
      const { userId, providerId, offeringId, date, time } = req.body;
      const booking = await bookingService.createBooking(
        userId,
        providerId,
        offeringId,
        date,
        time
      );
      res.status(201).json(booking);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const booking = await bookingService.getBookingById(
        Number(req.params.id)
      );
      if (!booking) return res.status(404).json({ error: "Booking not found" });
      res.json(booking);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };

  getUserBookings = async (req: Request, res: Response) => {
    try {
      const bookings = await bookingService.getBookingsByUser(
        Number(req.params.userId)
      );
      res.json(bookings);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };

  updateStatus = async (req: any, res: Response) => {
    try {
      const { status } = req.body;
      const providerId = req.user?.userId;
      const booking = await bookingService.updateBookingStatus(
        Number(req.params.id),
        providerId,
        status as BookingStatus
      );
      res.json(booking);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };
}

export const bookingController = new BookingController();

import { bookingService } from "../src/services/booking.service";
import Booking from "../src/models/booking";
import { BookingStatus } from "../src/utils/enum";
import { CAN_TRANSITION } from "../src/utils/constant";

jest.mock("../src/models/booking", () => ({
  create: jest.fn(),
  findByPk: jest.fn(),
  findAll: jest.fn(),
}));

describe("BookingService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("create a new booking", async () => {
    const mockBooking = {
      id: 1,
      userId: 10,
      providerId: 20,
      offeringId: 30,
      date: new Date(),
      time: "10:00 AM",
      status: BookingStatus.Pending,
    };

    (Booking.create as jest.Mock).mockResolvedValue(mockBooking);

    const result = await bookingService.createBooking(
      10,
      20,
      30,
      new Date(),
      "12:00"
    );

    expect(Booking.create).toHaveBeenCalledWith({
      userId: 10,
      providerId: 20,
      offeringId: 30,
      date: expect.any(Date),
      time: "12:00",
      status: BookingStatus.Pending,
    });
    expect(result).toEqual(mockBooking);
  });

  it("get bookings by user id", async () => {
    const mockBookings = [
      { id: 1, userId: 10 },
      { id: 2, userId: 10 },
    ];
    (Booking.findAll as jest.Mock).mockResolvedValue(mockBookings);

    const result = await bookingService.getBookingsByUser(10);

    expect(Booking.findAll).toHaveBeenCalledWith({ where: { userId: 10 } });
    expect(result).toEqual(mockBookings);
  });

  it("Provider update booking status to confirmed", async () => {
    const mockBooking: any = {
      dataValues: { providerId: 20, status: BookingStatus.Pending },
      set: jest.fn(),
      save: jest.fn().mockResolvedValue(true),
    };

    (Booking.findByPk as jest.Mock).mockResolvedValue(mockBooking);

    const result = await bookingService.updateBookingStatus(
      1,
      20,
      BookingStatus.Confirmed
    );
    expect(mockBooking.set).toHaveBeenCalledWith(
      "status",
      BookingStatus.Confirmed
    );
    expect(result).toBe(mockBooking);
  });

  it("Error when booking not found", async () => {
    (Booking.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(
      bookingService.updateBookingStatus(1, 20, BookingStatus.Confirmed)
    ).rejects.toThrow("Booking not found");
  });

  it("Pro should be same who is being booked by the user", async () => {
    const mockBooking: any = {
      dataValues: { providerId: 99, status: BookingStatus.Pending },
    };
    (Booking.findByPk as jest.Mock).mockResolvedValue(mockBooking);

    await expect(
      bookingService.updateBookingStatus(1, 20, BookingStatus.Confirmed)
    ).rejects.toThrow("You are not authorized to update this booking");
  });

  it("Booking status changed to invalid transition", async () => {
    const mockBooking: any = {
      dataValues: { providerId: 20, status: BookingStatus.Confirmed },
    };
    (Booking.findByPk as jest.Mock).mockResolvedValue(mockBooking);

    const invalidStatus = BookingStatus.Pending;
    const allowed = CAN_TRANSITION[BookingStatus.Pending];
    expect(allowed.includes(invalidStatus)).toBe(false);

    await expect(
      bookingService.updateBookingStatus(1, 20, invalidStatus)
    ).rejects.toThrow(
      `Invalid transition from ${BookingStatus.Confirmed} to ${invalidStatus}`
    );
  });
});

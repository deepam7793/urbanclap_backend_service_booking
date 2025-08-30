import { BookingStatus } from "./enum";

export const CAN_TRANSITION: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.Pending]: [BookingStatus.Confirmed, BookingStatus.Cancelled],
  [BookingStatus.Confirmed]: [BookingStatus.Completed, BookingStatus.Cancelled],
  [BookingStatus.Completed]: [],
  [BookingStatus.Cancelled]: [],
};
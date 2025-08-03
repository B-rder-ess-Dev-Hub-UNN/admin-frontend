import apifetch from "./api.tsx";

type SeatResponse = {
  status: boolean;
  msg: string;
  data: Seat[];
};
type Seat = {
  id: string;
  seat_number: number;
  is_taken: boolean;
};
export function seatState(options?: { signal?: AbortSignal }) {
  return apifetch<SeatResponse>("api/v1/seat/state/", {
    method: "GET",
    ...(options || {}),
  });
}
export function bookSeat(data: { seat_id: string; user_id: string }) {
  return apifetch("api/v1/seat/book/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function checkOutSeat(data: { seat_id: string }) {
  return apifetch("api/v1/seat/checkout/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

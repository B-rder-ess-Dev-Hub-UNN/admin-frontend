import apifetch from "./api";

type user = {
  name: string;
  email: string;
  seat_number: number;
};
type details = {
  available_seats: number;
  checked_in_count: number;
  checked_in_users: user[];
};

type CheckinStatsResponse = {
  status: boolean;
  msg: string;
  data: details;
};

type statsData = {
  member_percentage: number;
  non_member_percentage: number;
  total_checked_in_users: number;
};

type statsResponse = {
  status: boolean;
  msg: string;
  data: statsData;
};
export function Checkin() {
  return apifetch<CheckinStatsResponse>("api/v1/dashboard/stats/checkins/", {
    method: "GET",
  });
}

export function userStats() {
  return apifetch<statsResponse>("api/v1/dashboard/stats/users/", {
    method: "GET",
  });
}

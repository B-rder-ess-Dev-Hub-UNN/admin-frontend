import apifetch from "./api";

type PaymentResponse = {
  status: boolean;
  msg: string;
  data: Plan[];
};

export type Plan = {
  id: string;
  name: string;
  price: string;
};

export async function paymentPlans(options?: { signal?: AbortSignal }) {
  return apifetch<PaymentResponse>("api/v1/payments/plans/", {
    method: "GET",
    ...(options || {}),
  });
}

export async function paymentConfirm(data: {
  user_id: string;
  plan_id: string;
  expires_at: string;
}) {
  return apifetch("api/v1/payments/confirm/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

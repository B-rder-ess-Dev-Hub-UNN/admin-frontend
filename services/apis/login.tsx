import apifetch from "./api";
type LoginResponse = {
  status: boolean;
  msg: string;
  data: Data;
};

type Data = {
  name: string;
  email: string;
  id: string;
  tokens: Token;
};

type Token = {
  refresh_token: string;
  access_token: string;
};
export default async function loginAdmin(payload: {
  email: string;
  password: string;
}) {
  return await apifetch<LoginResponse>(
    "api/v1/admin/login/",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    false
  );
}

const base_Url = "https://hubauthbackend-production.up.railway.app/";

async function getrefreshtoken(token: string): Promise<string | null> {
  const res = await fetch(`${base_Url}api/v1/admin/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "123#5", // if required by your backend
    },
    body: JSON.stringify({ refresh_token: token }),
  });
  if (!res.ok) {
    console.log("cantfethc");
    return null;
  }
  const { data } = await res.json();
  return data.access_token;
}

export default async function apifetch<T>(
  endpoints: string,
  options: RequestInit = {},
  auth: boolean = true,
  retry: boolean = true
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": "123#5",
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  const res = await fetch(`${base_Url}${endpoints}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && auth && retry) {
    const refresh_token = localStorage.getItem("refresh_token");
    const newToken = await getrefreshtoken(`${refresh_token}`);
    if (newToken) {
      localStorage.setItem("access_token", newToken);
      return apifetch<T>(endpoints, options, auth, false);
    } else {
      throw new Error("Somthing wetin wroong.");
    }
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.msg || "Something went wrong.");
  }
  return res.json();
}

import client from "../api/client";

export async function fetchDashboard() {
  const { data } = await client.get("/dashboard");
  return data;
}

export async function createWash(payload) {
  const { data } = await client.post("/washes", payload);
  return data;
}

export async function fetchHistory(params) {
  const { data } = await client.get("/washes/history", { params });
  return data;
}
export async function deleteWash(id) {
  await client.delete(`/washes/${id}`);
}

export async function fetchDailySummary(date) {
  const { data } = await client.get("/washes/daily-summary", {
    params: date ? { date } : {},
  });
  return data;
}

export async function fetchMonthlySummary(year, month) {
  const { data } = await client.get("/washes/monthly-summary", {
    params: { year, month },
  });
  return data;
}

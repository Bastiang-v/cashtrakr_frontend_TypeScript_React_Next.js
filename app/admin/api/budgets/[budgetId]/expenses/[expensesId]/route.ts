import { verifySession } from "@/src/auth/dal";
import getToken from "@/src/auth/token";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { budgetId: string; expensesId: string };
  },
) {
  await verifySession();
  const token = getToken();
  console.log(params);
  const url = `${process.env.API_URL}/budgets/${params.budgetId}/expenses/${params.expensesId}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  if (!req.ok) {
    return Response.json(json.error, { status: 403 });
  }
  return Response.json(json);
}

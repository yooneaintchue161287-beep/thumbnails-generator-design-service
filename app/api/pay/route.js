import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  const res = await fetch("https://api.paymongo.com/v1/links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64"),
    },
    body: JSON.stringify({
      data: {
        attributes: {
          amount: 500,
          description: "Thumbnail Unlock",
        },
      },
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

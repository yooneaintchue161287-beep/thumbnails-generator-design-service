export const runtime = "nodejs";

export async function POST() {
  try {
    const res = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
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
            send_email_receipt: false,
            show_description: true,
            description: "Unlock YouTube Thumbnail",
            line_items: [
              {
                name: "Thumbnail Download",
                amount: 500,
                currency: "PHP",
                quantity: 1,
              },
            ],
            payment_method_types: ["gcash", "paymaya", "card"],
            success_url: "https://https://thumbnails-generator-design-service.vercel.app/success",
            cancel_url: "https://https://thumbnails-generator-design-service.vercel.app",
          },
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify(data), { status: 400 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Payment failed" }), { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, style } = await req.json();

  const prompt = `
YouTube thumbnail, ${style} style,
bold text, high contrast, clickable,
shocking face, dramatic lighting,
text says: "${title}",
professional YouTube thumbnail
`;

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024"
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

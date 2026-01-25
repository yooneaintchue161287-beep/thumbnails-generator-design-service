"use client";

import { useState } from "react";

export default function Home() {
  const [style, setStyle] = useState("gaming");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateThumbnail() {
    if (!title) {
      alert("Please enter a video title");
      return;
    }

    try {
      setLoading(true);
      setImage(null);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, style }),
      });

      if (!res.ok) {
        throw new Error("AI generation failed");
      }

      const data = await res.json();
      console.log("AI RESPONSE:", data);

      setImage(data.data[0].url);
    } catch (err) {
      console.error(err);
      alert("AI thumbnail generation failed. Check console.");
    } finally {
      setLoading(false);
    }
  }

  async function unlockAndPay() {
    try {
      const res = await fetch("/api/pay", { method: "POST" });

      if (!res.ok) {
        throw new Error("Payment link failed");
      }

      const data = await res.json();
      console.log("PAY RESPONSE:", data);

      window.location.href = data.data.attributes.checkout_url;
    } catch (err) {
      console.error(err);
      alert("Payment failed. Check console.");
    }
  }

  return (
    <div className="container">
      <h1>🔥 ThumbnailBoost</h1>
      <p>Generate high-CTR YouTube thumbnails with AI</p>

      <div className="card">
        <label>Video Title</label>
        <input
          placeholder="Enter your video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label style={{ marginTop: 10 }}>Thumbnail Style</label>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="gaming">Gaming</option>
          <option value="vlog">Vlog</option>
          <option value="education">Education</option>
          <option value="beast">MrBeast Style</option>
        </select>

        <button onClick={generateThumbnail} style={{ marginTop: 14 }}>
          {loading ? "Generating..." : "Generate Thumbnail"}
        </button>
      </div>

      {image && (
        <div className="card">
          <p>AI Thumbnail Preview</p>
          <img src={image} alt="AI Thumbnail" />

          <button onClick={unlockAndPay} style={{ marginTop: 12 }}>
            Unlock & Download (₱5)
          </button>
        </div>
      )}
    </div>
  );
}

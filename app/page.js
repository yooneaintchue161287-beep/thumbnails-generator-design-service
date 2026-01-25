const [image, setImage] = useState(null);
const [loading, setLoading] = useState(false);

"use client";
import { useState } from "react";

export default function Home() {
  const [style, setStyle] = useState("gaming");
  const [title, setTitle] = useState("");
  const [generated, setGenerated] = useState(false);

  return (
    <div className="container">
      <h1>🔥 ThumbnailBoost</h1>
      <p>Get more views with high-CTR thumbnails</p>

      <div className="card">
        <label>Video Title</label>
        <input
          placeholder="Type your video title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Thumbnail Style</label>
        <select onChange={(e) => setStyle(e.target.value)}>
          <option value="gaming">Gaming</option>
          <option value="vlog">Vlog</option>
          <option value="education">Education</option>
          <option value="beast">MrBeast Style</option>
        </select>

        <button
  onClick={async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, style }),
    });
    const data = await res.json();
    setImage(data.data[0].url);
    setLoading(false);
  }}
  style={{ marginTop: 12 }}
>
  {loading ? "Generating..." : "Generate Thumbnail"}
</button>
      </div>

      {image && (
  <div className="card">
    <p>AI Preview</p>
    <img src={image} />
    <button
      style={{ marginTop: 10 }}
      onClick={async () => {
        const res = await fetch("/api/pay", { method: "POST" });
        const data = await res.json();
        window.location.href = data.data.attributes.checkout_url;
      }}
    >
      Unlock & Download (₱5)
    </button>
  </div>
)}

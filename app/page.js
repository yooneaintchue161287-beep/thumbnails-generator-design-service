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

        <button onClick={() => setGenerated(true)} style={{ marginTop: 12 }}>
          Generate Thumbnail
        </button>
      </div>

      {generated && (
        <div className="card">
          <p>Preview (Watermarked)</p>
          <img src={`/styles/${style}.jpg`} />
          <p style={{ opacity: 0.7 }}>{title}</p>

          <button style={{ marginTop: 10 }}>
            Unlock & Download ($5)
          </button>
        </div>
      )}
    </div>
  );
}

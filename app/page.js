"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("gaming");
  const [generated, setGenerated] = useState(false);

  return (
    <div className="container">
      <h1>🔥 ThumbnailBoost</h1>
      <p>Create high-CTR YouTube thumbnails (no AI needed)</p>

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

        <button
          style={{ marginTop: 14 }}
          onClick={() => {
            if (!title) {
              alert("Please enter a title");
              return;
            }
            setGenerated(true);
          }}
        >
          Generate Thumbnail
        </button>
      </div>

      {generated && (
        <div className="card">
          <p>Preview</p>

          <div style={{ position: "relative" }}>
            <img src={`/styles/${style}.jpg`} />

            <div
              style={{
                position: "absolute",
                bottom: "10%",
                left: "5%",
                right: "5%",
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
                textShadow: "2px 2px 6px black",
                textAlign: "center",
              }}
            >
              {title}
            </div>
          </div>

          <button
            style={{ marginTop: 12 }}
            onClick={async () => {
              try {
                const res = await fetch("/api/pay", { method: "POST" });
                const data = await res.json();

                window.location.href =
                  data.data.attributes.checkout_url;
              } catch (err) {
                alert("Payment error");
              }
            }}
          >
            Unlock & Download (₱5)
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("gaming");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef(null);

  // Draw preview on canvas
  const drawPreview = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load base template
    const base = new Image();
    base.src = `/styles/${style}.jpg`;
    base.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

      // Draw uploaded user image if exists
      if (uploadedImage) {
        const userImg = new Image();
        userImg.src = uploadedImage;
        userImg.onload = () => {
          ctx.drawImage(userImg, canvas.width - 250, 10, 240, 240);
          drawTextAndWatermark(ctx);
        };
      } else {
        drawTextAndWatermark(ctx);
      }
    };
  };

  const drawTextAndWatermark = (ctx) => {
    // Draw title text
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";
    ctx.fillText(title, ctx.canvas.width / 2, ctx.canvas.height - 50);
    ctx.strokeText(title, ctx.canvas.width / 2, ctx.canvas.height - 50);

    // Draw watermark (always shown before payment)
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "bold 24px Arial";
    ctx.fillText("PREVIEW • ThumbnailBoost", ctx.canvas.width / 2, 30);
  };

  const handleGenerate = () => {
    if (!title) {
      alert("Enter a title");
      return;
    }
    setGenerated(true);
    setTimeout(drawPreview, 100); // slight delay for images to load
  };

  const handleUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
  };

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/pay", { method: "POST" });
      const data = await res.json();
      if (!data?.data?.attributes?.checkout_url) throw new Error();
      window.location.href = data.data.attributes.checkout_url;
    } catch (err) {
      alert("Payment failed. Check console.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>🔥 ThumbnailBoost</h1>
      <p>Create high-CTR YouTube thumbnails</p>

      <div className="card">
        <label>Video Title</label>
        <input
          placeholder="Enter video title"
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

        <label style={{ marginTop: 10 }}>Upload your photo (optional)</label>
        <input type="file" accept="image/*" onChange={handleUpload} />

        <button style={{ marginTop: 12 }} onClick={handleGenerate}>
          Generate Preview
        </button>
      </div>

      {generated && (
        <div className="card">
          <p>Preview (watermarked)</p>
          <canvas
            ref={canvasRef}
            width={800}
            height={450}
            style={{ width: "100%", border: "1px solid #ccc" }}
          />
          <button style={{ marginTop: 12 }} onClick={handlePayment}>
            Unlock & Download (₱5)
          </button>
        </div>
      )}
    </div>
  );
}

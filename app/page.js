"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("gaming");
  const [faceImage, setFaceImage] = useState(null); // base64
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef(null);

  // Draw thumbnail whenever something changes
  useEffect(() => {
    if (!generated) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bg = new Image();
    bg.src = `/styles/${style}.jpg`;

    bg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

      if (faceImage) {
        const face = new Image();
        face.src = faceImage;
        face.onload = () => {
          ctx.drawImage(face, canvas.width - 260, 20, 240, 240);
          drawText(ctx);
        };
      } else {
        drawText(ctx);
      }
    };
  }, [generated, style, title, faceImage]);

  const drawText = (ctx) => {
    // Title
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.font = "bold 38px Arial";
    ctx.textAlign = "center";
    ctx.fillText(title, ctx.canvas.width / 2, ctx.canvas.height - 40);
    ctx.strokeText(title, ctx.canvas.width / 2, ctx.canvas.height - 40);

    // Watermark
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "bold 22px Arial";
    ctx.fillText("PREVIEW • ThumbnailBoost", ctx.canvas.width / 2, 32);
  };

  const handleGenerate = () => {
    if (!title) {
      alert("Please enter a title");
      return;
    }
    setGenerated(true);
  };

  // ✅ FILE READER (CRITICAL FIX)
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFaceImage(reader.result); // base64
    };
    reader.readAsDataURL(file);
  };

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/pay", { method: "POST" });
      const data = await res.json();
      window.location.href = data.data.attributes.checkout_url;
    } catch (err) {
      alert("Payment failed");
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

        <label style={{ marginTop: 10 }}>Upload Face Photo</label>
        <input type="file" accept="image/*" onChange={handleUpload} />
  {faceImage && (
  <img
    src={faceImage}
    style={{ width: "200px", border: "2px solid green" }}
  />
)}

        <button style={{ marginTop: 14 }} onClick={handleGenerate}>
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
  style={{
    width: "100%",
    height: "300px",
    background: "red",
    border: "4px solid yellow",
  }}
/>

          <button style={{ marginTop: 14 }} onClick={handlePayment}>
            Unlock & Download (₱5)
          </button>
        </div>
      )}
    </div>
  );
}

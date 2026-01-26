"use client";

import { useRef, useEffect } from "react";

export default function Success() {
  const canvasRef = useRef(null);

  // Load final template for download (no watermark)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const base = new Image();
    base.src = `/styles/gaming.jpg`; // optional: dynamic based on user selection
    base.onload = () => {
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Your Video Title", canvas.width / 2, canvas.height - 50);
    };
  }, []);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "thumbnail.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="container">
      <h1>✅ Payment Successful</h1>
      <p>Your thumbnail is ready to download</p>
      <canvas ref={canvasRef} width={800} height={450} style={{ width: "100%", border: "1px solid #ccc" }} />
      <button style={{ marginTop: 20 }} onClick={downloadImage}>
        Download Thumbnail
      </button>
      <p style={{ marginTop: 20, fontSize: 12 }}>Thank you for your purchase 🙏</p>
    </div>
  );
}

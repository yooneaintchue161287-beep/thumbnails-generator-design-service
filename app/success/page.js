"use client";

export default function Success() {
  return (
    <div className="container">
      <h1>✅ Payment Successful</h1>
      <p>Your thumbnail is ready to download.</p>

      <a
        href="/styles/gaming.jpg"
        download
      >
        <button style={{ marginTop: 20 }}>
          Download Thumbnail
        </button>
      </a>

      <p style={{ marginTop: 20, fontSize: 12 }}>
        Thank you for your purchase 🙏
      </p>
    </div>
  );
}

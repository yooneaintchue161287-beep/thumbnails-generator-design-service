export default function Pricing() {
  return (
    <div className="container">
      <h1>💰 Pricing</h1>

      <div className="card">
        <h3>Free</h3>
        <p>✔ Preview thumbnails</p>
        <p>❌ Watermark</p>
      </div>

      <div className="card">
        <h3>Creator – $15/month</h3>
        <p>✔ 20 thumbnails</p>
        <p>✔ No watermark</p>
      </div>

      <div className="card">
        <h3>Pro – $39/month</h3>
        <p>✔ Unlimited thumbnails</p>
        <p>✔ Custom design weekly</p>
      </div>
    </div>
  );
}

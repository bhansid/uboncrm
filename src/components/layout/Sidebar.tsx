import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#f4f6f8",
        padding: 20,
        borderRight: "1px solid #ddd",
      }}
    >
      <h2 style={{ marginBottom: 30 }}>UBON</h2>

      <div style={{ marginBottom: 12 }}>
        <Link to="/">Dashboard</Link>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/retailers">Retailers</Link>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/orders">Orders</Link>
      </div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/maps">Maps</Link>
      </div>
    </aside>
  );
}

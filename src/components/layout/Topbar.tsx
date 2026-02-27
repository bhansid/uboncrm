export default function Topbar() {
  return (
    <header
      style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        UBON CRM
      </div>

      <div style={{ fontSize: 14, color: "#6b7280" }}>
        Admin
      </div>
    </header>
  );
}

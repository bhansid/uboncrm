import PageShell from "../../components/layout/PageShell";
import Card from "../../components/ui/Card";

export default function AdminDashboard() {
  return (
    <PageShell>
      <h1 style={{ marginBottom: 20 }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
      >
        <Card title="Total Retailers" value="128" />
        <Card title="Outstanding Amount" value="KES 1,240,000" />
        <Card title="Sales Today" value="KES 82,000" />
        <Card title="Follow-ups Due" value="14" />
      </div>
    </PageShell>
  );
}

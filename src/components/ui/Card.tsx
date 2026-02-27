type CardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function Card({ title, value, subtitle }: CardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        minWidth: 220,
      }}
    >
      <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
        {title}
      </div>

      <div style={{ fontSize: 28, fontWeight: 600 }}>{value}</div>

      {subtitle && (
        <div style={{ fontSize: 13, color: "#10b981", marginTop: 6 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

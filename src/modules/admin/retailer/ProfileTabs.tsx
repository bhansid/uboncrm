type Props = {
  active: string;
  onChange: (tab: string) => void;
};

const tabs = [
  "Overview",
  "Orders",
  "Stock",
  "Consignment",
  "Payments",
  "Activity",
];

export default function ProfileTabs({
  active,
  onChange,
}: Props) {
  return (
    <div style={{ marginBottom: 20 }}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            marginRight: 8,
            padding: "8px 14px",
            borderRadius: 8,
            border:
              active === t
                ? "2px solid #2563eb"
                : "1px solid #e5e7eb",
            background:
              active === t ? "#2563eb" : "#fff",
            color:
              active === t ? "#fff" : "#111827",
            cursor: "pointer",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

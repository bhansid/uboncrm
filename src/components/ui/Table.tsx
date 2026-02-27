type Column = {
  key: string;
  label: string;
};

type Props = {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
};

export default function Table({ columns, data, onRowClick }: Props) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f9fafb" }}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  textAlign: "left",
                  padding: 14,
                  fontSize: 13,
                  color: "#6b7280",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              style={{
                cursor: onRowClick ? "pointer" : "default",
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: 14,
                    borderBottom: "1px solid #f1f5f9",
                    fontSize: 14,
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

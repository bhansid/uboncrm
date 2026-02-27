type Props = {
  stock: any[];
  products: any[];
  orders: any[];
};

export default function ConsignmentTab({
  stock,
  products,
  orders,
}: Props) {
  const consignmentOrderIds = orders
    .filter((o) => o.Order_Type === "Consignment")
    .map((o) => o.Order_ID);

  const map: Record<string, any> = {};

  stock.forEach((m) => {
    if (!consignmentOrderIds.includes(m.Reference_ID))
      return;

    const product =
      products.find(
        (p) => p.Product_ID === m.Product_ID
      ) || {};

    if (!map[m.Product_ID]) {
      map[m.Product_ID] = {
        Product_Name:
          product.Product_Name || m.Product_ID,
        Selling_Price:
          Number(product.Selling_Price) || 0,
        Qty_Given: 0,
        Qty_Sold: 0,
      };
    }

    if (m.Movement_Type === "IN") {
      map[m.Product_ID].Qty_Given +=
        Number(m.Quantity) || 0;
    }

    if (m.Movement_Type === "OUT") {
      map[m.Product_ID].Qty_Sold += Math.abs(
        Number(m.Quantity) || 0
      );
    }
  });

  const rows = Object.values(map).map(
    (r: any) => {
      const inHand =
        r.Qty_Given - r.Qty_Sold;

      return {
        ...r,
        Qty_In_Hand: inHand,
        Sold_Value:
          r.Qty_Sold * r.Selling_Price,
        Pending_Value:
          inHand * r.Selling_Price,
      };
    }
  );

  if (!rows.length) {
    return <p>No consignment data.</p>;
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,.06)",
        overflow: "hidden",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ background: "#f9fafb" }}>
          <tr>
            <th style={th}>Product</th>
            <th style={th}>Qty Given</th>
            <th style={th}>Qty Sold</th>
            <th style={th}>Qty In Hand</th>
            <th style={th}>Sold Value</th>
            <th style={th}>Pending Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any, i) => (
            <tr key={i}>
              <td style={td}>{r.Product_Name}</td>
              <td style={td}>{r.Qty_Given}</td>
              <td style={td}>{r.Qty_Sold}</td>
              <td style={td}>{r.Qty_In_Hand}</td>
              <td style={td}>
                KES {r.Sold_Value}
              </td>
              <td style={td}>
                KES {r.Pending_Value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: 14,
  fontSize: 13,
  color: "#6b7280",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: 14,
  borderBottom: "1px solid #f1f5f9",
  fontSize: 14,
};

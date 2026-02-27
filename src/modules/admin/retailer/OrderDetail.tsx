import Table from "../../../components/ui/Table";

type Props = {
  order: any;
  items: any[];
  products: any[];
  onClose: () => void;
};

export default function OrderDetail({
  order,
  items,
  products,
  onClose,
}: Props) {
  const enrichedItems = items.map((it) => {
    const product =
      products.find(
        (p: any) => p.Product_ID === it.Product_ID
      ) || {};

    return {
      ...it,
      Product_Name: product.Product_Name || it.Product_ID,
      Cost_Price: product.Cost_Price,
      Selling_Price: product.Selling_Price,
    };
  });

  const columns = [
    { key: "Product_Name", label: "Product" },
    { key: "Quantity", label: "Qty" },
    { key: "Cost_Price", label: "Cost" },
    { key: "Extra_Margin", label: "Margin" },
    { key: "Final_Rate", label: "Final Rate" },
    { key: "Line_Total", label: "Line Total" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "420px",
        height: "100%",
        background: "#ffffff",
        boxShadow: "-2px 0 12px rgba(0,0,0,0.15)",
        padding: 20,
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      <button onClick={onClose} style={{ marginBottom: 20 }}>
        Close
      </button>

      <h3 style={{ marginBottom: 10 }}>
        Order {order.Order_ID}
      </h3>

      <p style={{ marginBottom: 20, color: "#6b7280" }}>
        Type: {order.Order_Type} <br />
        Status: {order.Order_Status}
      </p>

      <Table columns={columns} data={enrichedItems} />
    </div>
  );
}

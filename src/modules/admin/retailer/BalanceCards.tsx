type Props = {
  retailer: any;
  assignedAgentName: string;
  orders: any[];
  orderItems: any[];
  payments: any[];
  products: any[];
  stock: any[];
};

export default function BalanceCards({
  retailer,
  assignedAgentName,
  orders,
  orderItems,
  payments,
  products,
  stock,
}: Props) {
  const totalSales = orders.reduce((sum, order) => {
    const items = orderItems.filter(
      (i) => i.Order_ID === order.Order_ID
    );
    return (
      sum +
      items.reduce(
        (s, i) =>
          s +
          Number(i.Quantity || 0) *
            Number(i.Final_Rate || 0),
        0
      )
    );
  }, 0);

  const paymentsReceived = payments
    .filter((p) => p.Payment_Status === "Paid")
    .reduce(
      (s, p) => s + Number(p.Amount || 0),
      0
    );

  const paymentsPending = payments
    .filter((p) => p.Payment_Status === "Pending")
    .reduce(
      (s, p) => s + Number(p.Amount || 0),
      0
    );

  const consignmentOrders = orders.filter(
    (o) => o.Order_Type === "Consignment"
  );

  const consignmentOrderIds = consignmentOrders.map(
    (o) => o.Order_ID
  );

  const consignmentValue = orderItems
    .filter((i) =>
      consignmentOrderIds.includes(i.Order_ID)
    )
    .reduce(
      (s, i) =>
        s +
        Number(i.Quantity || 0) *
          Number(i.Final_Rate || 0),
      0
    );

  const verifiedConsignmentPayments =
    payments
      .filter(
        (p) =>
          p.Payment_Status === "Paid" &&
          consignmentOrderIds.includes(
            p.Linked_ID
          )
      )
      .reduce(
        (s, p) =>
          s + Number(p.Amount || 0),
        0
      );

  const effectiveOutstanding = Math.max(
    0,
    consignmentValue -
      verifiedConsignmentPayments
  );

  let margin = 0;
  stock.forEach((m) => {
    if (m.Movement_Type !== "OUT")
      return;
    const product = products.find(
      (p) => p.Product_ID === m.Product_ID
    );
    if (!product) return;
    margin +=
      Math.abs(Number(m.Quantity)) *
      (Number(product.Selling_Price) -
        Number(product.Cost_Price));
  });

  const statusLabel = `${retailer.Retailer_Status || "—"} / ${
    retailer.KYC_Status || "—"
  }`;

  return (
    <>
      <Row>
        <Card title="Status" value={statusLabel} />
        <Card
          title="Follow-up"
          value={
            retailer.Follow_Up_Date ||
            retailer.Follow_Up ||
            "—"
          }
        />
        <Card
          title="Assigned Agent"
          value={assignedAgentName}
        />
        <Card
          title="Total Sales"
          value={`KES ${totalSales}`}
          bold
        />
      </Row>

      <Row>
        <Card
          title="Payments Received"
          value={`KES ${paymentsReceived}`}
        />
        <Card
          title="Payments Pending Approval"
          value={`KES ${paymentsPending}`}
          warn={paymentsPending > 0}
        />
        <Card
          title="Effective Outstanding"
          value={`KES ${effectiveOutstanding}`}
          danger={effectiveOutstanding > 0}
        />
        <Card
          title="Our Margin"
          value={`KES ${margin}`}
          success={margin > 0}
        />
      </Row>
    </>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 16,
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

function Card({
  title,
  value,
  bold,
  warn,
  danger,
  success,
}: {
  title: string;
  value: string;
  bold?: boolean;
  warn?: boolean;
  danger?: boolean;
  success?: boolean;
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 14,
        boxShadow: "0 2px 10px rgba(0,0,0,.06)",
        border: danger
          ? "2px solid #ef4444"
          : warn
          ? "2px solid #f59e0b"
          : success
          ? "2px solid #22c55e"
          : "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontSize: 13, color: "#6b7280" }}>
        {title}
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: bold ? 22 : 18,
          fontWeight: bold ? 700 : 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

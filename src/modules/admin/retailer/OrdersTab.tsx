import { useState } from "react";
import AgentPopup from "../../../components/AgentPopup";
import OrderDetail from "./OrderDetail";

type Props = {
  orders: any[];
  orderItems: any[];
  products: any[];
  agents: any[];
};

function formatDateTime(value: string) {
  if (!value) return "-";
  const d = new Date(value);
  return d.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getOrderAmount(orderId: string, items: any[]) {
  return items
    .filter((i) => i.Order_ID === orderId)
    .reduce(
      (sum, i) =>
        sum +
        Number(i.Quantity || 0) *
          Number(i.Final_Rate || 0),
      0
    );
}

export default function OrdersTab({
  orders,
  orderItems,
  products,
  agents,
}: Props) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  return (
    <>
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
              <th style={th}>Order No</th>
              <th style={th}>Order Type</th>
              <th style={th}>Amount (KES)</th>
              <th style={th}>Status</th>
              <th style={th}>Agent</th>
              <th style={th}>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => {
              const agent = agents.find(
                (a) => a.Agent_ID === o.Agent_ID
              );

              const amount = getOrderAmount(
                o.Order_ID,
                orderItems
              );

              return (
                <tr key={o.Order_ID}>
                  <td style={td}>
                    <span
                      style={link}
                      onClick={() => setSelectedOrder(o)}
                    >
                      {o.Order_ID}
                    </span>
                  </td>

                  <td style={td}>{o.Order_Type}</td>
                  <td style={td}>
                    KES {amount.toLocaleString()}
                  </td>
                  <td style={td}>{o.Order_Status}</td>

                  <td style={td}>
                    {agent ? (
                      <span
                        style={link}
                        onClick={() =>
                          setSelectedAgent(agent)
                        }
                      >
                        {agent.Agent_Name}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td style={td}>
                    {formatDateTime(o.Order_Date)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedAgent && (
        <AgentPopup
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          items={orderItems.filter(
            (i) => i.Order_ID === selectedOrder.Order_ID
          )}
          products={products}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: 14,
  fontSize: 13,
  color: "#6b7280",
  borderBottom: "1px solid #e5e7eb",
};

const td: React.CSSProperties = {
  padding: 14,
  borderBottom: "1px solid #f1f5f9",
  fontSize: 14,
};

const link = {
  color: "#2563eb",
  cursor: "pointer",
  textDecoration: "underline",
};

import { useState } from "react";
import PaymentApprovalDrawer from "./PaymentApprovalDrawer";
import {
  approvePayment,
  rejectPayment,
} from "../../../api/payments.client";

type Props = {
  payments: any[];
  onRefresh: () => void;
};

export default function PaymentsTab({
  payments,
  onRefresh,
}: Props) {
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);


async function handleApprove() {
  setLoading(true);
  await approvePayment(
    selected.Payment_ID,
    "Admin"
  );
  setSelected(null);

  // allow GAS to finish
  setTimeout(() => {
    onRefresh();
    setLoading(false);
  }, 800);
}

async function handleReject() {
  setLoading(true);
  await rejectPayment(selected.Payment_ID);
  setSelected(null);

  setTimeout(() => {
    onRefresh();
    setLoading(false);
  }, 800);
}

  return (
    <>
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
              <th style={th}>Payment ID</th>
              <th style={th}>Order</th>
              <th style={th}>Amount</th>
              <th style={th}>Mode</th>
              <th style={th}>Status</th>
              <th style={th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.Payment_ID}>
                <td style={td}>{p.Payment_ID}</td>
                <td style={td}>{p.Linked_ID}</td>
                <td style={td}>KES {p.Amount}</td>
                <td style={td}>{p.Payment_Mode}</td>
                <td style={td}>
                  {p.Payment_Status ===
                  "Pending" ? (
                    <span
                      onClick={() =>
                        setSelected(p)
                      }
                      style={pending}
                    >
                      Pending Approval
                    </span>
                  ) : (
                    <span
                      style={
                        p.Payment_Status ===
                        "Paid"
                          ? paid
                          : rejected
                      }
                    >
                      {p.Payment_Status}
                    </span>
                  )}
                </td>
                <td style={td}>
                  {p.Created_Date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <PaymentApprovalDrawer
          payment={selected}
          onClose={() =>
            setSelected(null)
          }
          onApprove={handleApprove}
          onReject={handleReject}
          loading={loading}
        />
      )}
    </>
  );
}

const th = {
  textAlign: "left" as const,
  padding: 14,
  fontSize: 13,
  color: "#6b7280",
};

const td = {
  padding: 14,
  borderBottom: "1px solid #f1f5f9",
};

const pending = {
  background: "#fef3c7",
  color: "#92400e",
  padding: "6px 10px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 12,
};

const paid = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 10px",
  borderRadius: 12,
  fontSize: 12,
};

const rejected = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "6px 10px",
  borderRadius: 12,
  fontSize: 12,
};

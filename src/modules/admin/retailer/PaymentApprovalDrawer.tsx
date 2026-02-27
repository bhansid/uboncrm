type Props = {
  payment: any;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  loading: boolean;
};

export default function PaymentApprovalDrawer({
  payment,
  onClose,
  onApprove,
  onReject,
  loading,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 420,
        height: "100%",
        background: "#fff",
        boxShadow: "-4px 0 20px rgba(0,0,0,.15)",
        zIndex: 3000,
        padding: 20,
      }}
    >
      <h2>Payment Approval</h2>

      <p><b>Payment ID:</b> {payment.Payment_ID}</p>
      <p><b>Order:</b> {payment.Linked_ID}</p>
      <p><b>Amount:</b> KES {payment.Amount}</p>
      <p><b>Mode:</b> {payment.Payment_Mode}</p>

      <div style={{ marginTop: 12 }}>
        {payment.Proof_Image_URL ? (
          <img
            src={payment.Proof_Image_URL}
            style={{ width: "100%" }}
          />
        ) : (
          <i>No proof uploaded</i>
        )}
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          gap: 10,
        }}
      >
        <button
          onClick={onApprove}
          disabled={loading}
          style={btnGreen}
        >
          {loading ? "Processing…" : "Approve"}
        </button>

        <button
          onClick={onReject}
          disabled={loading}
          style={btnRed}
        >
          {loading ? "Processing…" : "Reject"}
        </button>
      </div>

      <button
        onClick={onClose}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        Close
      </button>
    </div>
  );
}

const btnGreen = {
  flex: 1,
  background: "#22c55e",
  color: "#fff",
  padding: 12,
  borderRadius: 8,
  border: "none",
};

const btnRed = {
  flex: 1,
  background: "#ef4444",
  color: "#fff",
  padding: 12,
  borderRadius: 8,
  border: "none",
};

type Props = {
  agent: any;
  onClose: () => void;
};

export default function AgentPopup({ agent, onClose }: Props) {
  if (!agent) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          right: 20,
          top: 80,
          width: 300,
          background: "#ffffff",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ marginBottom: 10 }}>
          {agent.Agent_Name}
        </h3>

        <p style={{ marginBottom: 6 }}>
          <strong>Phone:</strong> {agent.Phone}
        </p>
        <p style={{ marginBottom: 6 }}>
          <strong>Area:</strong> {agent.Area}
        </p>
        <p style={{ marginBottom: 6 }}>
          <strong>Status:</strong> {agent.Status}
        </p>

        <button
          style={{ marginTop: 12 }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

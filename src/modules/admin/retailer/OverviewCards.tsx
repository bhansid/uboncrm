import Card from "../../../components/ui/Card";

type Props = {
  retailer: any;
  agentName: string;
};

export default function OverviewCards({ retailer, agentName }: Props) {
  if (!retailer) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
        marginBottom: 30,
      }}
    >
      <Card
        title="Status"
        value={retailer.Retailer_Status || "-"}
      />

      <Card
        title="Outstanding"
        value={`KES ${retailer.Current_Balance || 0}`}
      />

      <Card
        title="Follow-up"
        value={retailer.Followup_Status || "-"}
      />

      <Card
        title="Assigned Agent"
        value={agentName || "-"}
      />
    </div>
  );
}

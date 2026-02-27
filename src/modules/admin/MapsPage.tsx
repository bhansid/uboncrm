import PageShell from "../../components/layout/PageShell";
import RetailerMap from "../maps/RetailerMap";

export default function MapsPage() {
  return (
    <PageShell>
      <h1 style={{ marginBottom: 20 }}>Retailer Map</h1>
      <RetailerMap />
    </PageShell>
  );
}

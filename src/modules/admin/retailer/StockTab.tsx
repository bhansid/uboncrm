import Table from "../../../components/ui/Table";

type Props = {
  stock: any[];
};

export default function StockTab({ stock }: Props) {
  // Group by Product_ID
  const stockMap: Record<string, any> = {};

  stock.forEach((m) => {
    if (!stockMap[m.Product_ID]) {
      stockMap[m.Product_ID] = {
        Product_ID: m.Product_ID,
        Qty_In_Hand: 0,
        Last_Updated: m.Date,
      };
    }

    stockMap[m.Product_ID].Qty_In_Hand += Number(
      m.Quantity || 0
    );

    if (
      new Date(m.Date) >
      new Date(stockMap[m.Product_ID].Last_Updated)
    ) {
      stockMap[m.Product_ID].Last_Updated = m.Date;
    }
  });

  const rows = Object.values(stockMap).map(
    (r: any) => ({
      Product_ID: r.Product_ID,
      Qty_In_Hand: r.Qty_In_Hand,
      Last_Updated: r.Last_Updated
        ? new Date(r.Last_Updated)
            .toISOString()
            .split("T")[0]
        : "-",
    })
  );

  const columns = [
    { key: "Product_ID", label: "Product" },
    { key: "Qty_In_Hand", label: "Qty In Hand" },
    { key: "Last_Updated", label: "Last Updated" },
  ];

  if (!rows.length) {
    return <p>No stock movements found.</p>;
  }

  return <Table columns={columns} data={rows} />;
}

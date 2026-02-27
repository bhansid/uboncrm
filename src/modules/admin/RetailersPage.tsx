import PageShell from "../../components/layout/PageShell";
import Table from "../../components/ui/Table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRetailers } from "../../api/sheets.client";

export default function RetailersPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchRetailers()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "Retailer_ID", label: "ID" },
    { key: "Retailer_Name", label: "Retailer Name" },
    { key: "Area", label: "Area" },
    { key: "Assigned_Agent_ID", label: "Agent" },
    { key: "Current_Balance", label: "Outstanding" },
    { key: "Retailer_Status", label: "Status" },
  ];

  const filteredData = data.filter((r) => {
    const matchesSearch =
      r.Retailer_Name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter || r.Retailer_Status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <PageShell>
        <p>Loading retailers...</p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <h1 style={{ marginBottom: 20 }}>Retailers</h1>

      {/* SEARCH + FILTER BAR */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <input
          type="text"
          placeholder="Search retailer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 10,
            width: 260,
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* RETAILERS TABLE */}
      <Table
        columns={columns}
        data={filteredData}
        onRowClick={(row) =>
          navigate(`/retailers/${row.Retailer_ID}`)
        }
      />
    </PageShell>
  );
}

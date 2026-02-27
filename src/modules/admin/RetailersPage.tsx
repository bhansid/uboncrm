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

  // 🔥 TEST FUNCTION
  const testCreateRetailer = async () => {
    await fetch(
      "https://script.google.com/macros/s/AKfycbzr1X4juNDVhrJcaZ_tIGkFyECF-AMU1iXQQygHVB5Cthfpy4knkM4xbK_uZJsZYZ5k/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          action: "createRetailer",
          Retailer_Name: "LIVE DEPLOY TEST",
          Owner_Name: "LIVE OWNER",
          Phone: "5550000001",
          Area: "Live Area",
          City: "Nairobi",
          State: "Nairobi",
          Pincode: "100001",
          Latitude: "-1.286389",
          Longitude: "36.817223",
          Assigned_Agent_ID: "A001",
          Building_Name: "Live Building",
          Shop_Type: "Mobile",
          Remarks: "Live deploy test",
          images: [],
        }),
      }
    );

    alert("Request sent. Check sheet.");
  };

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

      {/* 🔥 TEST BUTTON */}
      <button
        onClick={testCreateRetailer}
        style={{
          marginBottom: 20,
          padding: "10px 16px",
          background: "#111827",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        TEST CREATE RETAILER
      </button>

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
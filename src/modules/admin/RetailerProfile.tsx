import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageShell from "../../components/layout/PageShell";
import BalanceCards from "./retailer/BalanceCards";
import ProfileTabs from "./retailer/ProfileTabs";

import OrdersTab from "./retailer/OrdersTab";
import StockTab from "./retailer/StockTab";
import PaymentsTab from "./retailer/PaymentsTab";
import ConsignmentTab from "./retailer/ConsignmentTab";

import {
  fetchRetailers,
  fetchAgents,
  fetchOrders,
  fetchOrderItems,
  fetchPayments,
} from "../../api/sheets.client";

import {
  fetchProducts,
  fetchRetailerStockMovements,
} from "../../api/products.client";

export default function RetailerProfile() {
  const { id } = useParams<{ id: string }>();

  const [retailer, setRetailer] = useState<any | null>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [stock, setStock] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [loading, setLoading] = useState(true);

  async function refreshAll() {
    setLoading(true);

    const [
      retailers,
      agentsRes,
      ordersRes,
      itemsRes,
      productsRes,
      stockRes,
      paymentsRes,
    ] = await Promise.all([
      fetchRetailers(),
      fetchAgents(),
      fetchOrders(),
      fetchOrderItems(),
      fetchProducts(),
      fetchRetailerStockMovements(),
      fetchPayments(),
    ]);

    const currentRetailer = retailers.find(
      (r: any) => r.Retailer_ID === id
    );

    if (!currentRetailer) {
      setRetailer(null);
      setLoading(false);
      return;
    }

    const retailerOrders = ordersRes.filter(
      (o: any) => o.Retailer_ID === id
    );

    const retailerOrderIds = retailerOrders.map(
      (o: any) => o.Order_ID
    );

    setRetailer(currentRetailer);
    setAgents(agentsRes);
    setOrders(retailerOrders);

    setOrderItems(
      itemsRes.filter((i: any) =>
        retailerOrderIds.includes(i.Order_ID)
      )
    );

    setProducts(productsRes);

    setStock(
      stockRes.filter(
        (s: any) => s.Retailer_ID === id
      )
    );

    setPayments(
      paymentsRes.filter(
        (p: any) => p.Retailer_ID === id
      )
    );

    setLoading(false);
  }

  useEffect(() => {
    refreshAll();
  }, [id]);

  if (loading) {
    return (
      <PageShell>
        <p>Loading…</p>
      </PageShell>
    );
  }

  if (!retailer) {
    return (
      <PageShell>
        <p>Retailer not found</p>
      </PageShell>
    );
  }

  const assignedAgent =
    agents.find(
      (a) =>
        a.Agent_ID ===
        retailer.Assigned_Agent_ID
    ) || {};

  const mapsUrl =
    retailer.Latitude && retailer.Longitude
      ? `https://www.google.com/maps?q=${retailer.Latitude},${retailer.Longitude}`
      : "";

  return (
    <PageShell>
      {/* =====================
          RETAILER HEADER
         ===================== */}
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <img
          src={
            retailer.Shop_Image_URL ||
            "https://via.placeholder.com/80"
          }
          alt="Shop"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0 }}>
            {retailer.Retailer_Name}
          </h1>
          <p style={{ margin: "4px 0" }}>
            {retailer.Area} • Owner:{" "}
            {retailer.Owner_Name}
          </p>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 8,
            }}
          >
            {retailer.Phone && (
              <a
                href={`tel:${retailer.Phone}`}
                style={btn}
              >
                📞 {retailer.Phone}
              </a>
            )}

            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                style={btn}
              >
                📍 View Location
              </a>
            )}
          </div>
        </div>
      </div>

      {/* =====================
          SUMMARY CARDS
         ===================== */}
      <BalanceCards
        retailer={retailer}
        assignedAgentName={
          assignedAgent.Agent_Name || "—"
        }
        orders={orders}
        orderItems={orderItems}
        payments={payments}
        products={products}
        stock={stock}
      />

      <ProfileTabs
        active={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "Orders" && (
        <OrdersTab
          orders={orders}
          orderItems={orderItems}
          products={products}
          agents={agents}
        />
      )}

      {activeTab === "Stock" && (
        <StockTab stock={stock} />
      )}

      {activeTab === "Consignment" && (
        <ConsignmentTab
          stock={stock}
          products={products}
          orders={orders}
        />
      )}

      {activeTab === "Payments" && (
        <PaymentsTab
          payments={payments}
          onRefresh={refreshAll}
        />
      )}
    </PageShell>
  );
}

const btn = {
  background: "#f3f4f6",
  padding: "6px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: "#111827",
  fontSize: 14,
};

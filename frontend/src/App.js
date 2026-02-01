import React, { useState } from "react";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  const [page, setPage] = useState("menu");

  return (
    <div>
      <button onClick={() => setPage("menu")}>Menu</button>
      <button onClick={() => setPage("orders")}>Orders</button>

      {page === "menu" && <MenuPage />}
      {page === "orders" && <OrdersPage />}
    </div>
  );
}

export default App;


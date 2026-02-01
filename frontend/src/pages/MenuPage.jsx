import React, { useEffect, useState } from "react";
import {
  getMenu,
  searchMenu,
  toggleAvailability,
  createMenuItem,
} from "../api";
import useDebounce from "../hooks/useDebounce";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "Appetizer",
    price: "",
  });

  const debouncedSearch = useDebounce(search);

  /* ✅ SINGLE SOURCE OF DATA FETCHING */
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const res =
          debouncedSearch.trim() === ""
            ? await getMenu()
            : await searchMenu(debouncedSearch);

        setMenu(res.data);
      } catch {
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [debouncedSearch]);

  /* ✅ TOGGLE AVAILABILITY (OPTIMISTIC UI) */
  const handleToggle = async (id) => {
    const oldMenu = [...menu];

    setMenu((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );

    try {
      await toggleAvailability(id);
    } catch {
      alert("Update failed, reverting...");
      setMenu(oldMenu);
    }
  };

  /* ✅ FORM HANDLERS */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMenuItem({
        ...formData,
        price: Number(formData.price),
      });

      setFormData({ name: "", category: "Appetizer", price: "" });

      // Refresh menu
      const res = await getMenu();
      setMenu(res.data);
    } catch {
      alert("Failed to add item");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu Management</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search menu items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "60%", marginBottom: "15px" }}
      />

      {/* ➕ ADD MENU ITEM */}
      <h2>Add Menu Item</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Appetizer</option>
          <option>Main Course</option>
          <option>Dessert</option>
          <option>Beverage</option>
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Item</button>
      </form>

      {/* ⏳ STATES */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && menu.length === 0 && <p>No items found</p>}

      {/* 📋 MENU LIST */}
      <ul>
        {menu.map((item) => (
          <li key={item._id} style={{ marginBottom: "10px" }}>
            <strong>{item.name}</strong> — ₹{item.price} <br />
            Category: {item.category} <br />
            Available: {item.isAvailable ? "Yes" : "No"} <br />

            <button onClick={() => handleToggle(item._id)}>
              Toggle Availability
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;

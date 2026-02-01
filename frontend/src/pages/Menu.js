import { useEffect, useState } from "react";
import { getMenu, searchMenu, toggleAvailability } from "../api";
import useDebounce from "../hooks/useDebounce";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    if (debouncedSearch === "") {
      fetchMenu();
    } else {
      handleSearch();
    }
  }, [debouncedSearch]);

  const fetchMenu = async () => {
    setLoading(true);
    const res = await getMenu();
    setMenu(res.data);
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const res = await searchMenu(debouncedSearch);
    setMenu(res.data);
    setLoading(false);
  };

  const handleToggle = async (id) => {
    const oldMenu = [...menu];

    // Optimistic UI
    setMenu(menu.map(item =>
      item._id === id
        ? { ...item, isAvailable: !item.isAvailable }
        : item
    ));

    try {
      await toggleAvailability(id);
    } catch (err) {
      alert("Update failed");
      setMenu(oldMenu); // rollback
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Menu Management</h2>

      <input
        placeholder="Search menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: "60%" }}
      />

      {loading && <p>Loading...</p>}

      {menu.map(item => (
        <div key={item._id} style={{
          border: "1px solid #ccc",
          marginTop: 10,
          padding: 10
        }}>
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
          <p>Status: {item.isAvailable ? "Available" : "Not Available"}</p>

          <button onClick={() => handleToggle(item._id)}>
            Toggle Availability
          </button>
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../services/CustomItemsAPI";

const AllItemsPage = () => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await deleteItem(id);
      loadItems();
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <h1>All Custom Items</h1>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <pre>{JSON.stringify(item.features, null, 2)}</pre>
          <p>Total: ${item.total_price}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AllItemsPage;

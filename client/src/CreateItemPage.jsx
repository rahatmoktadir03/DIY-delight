import React, { useState } from "react";
import { createItem } from "../services/CustomItemsAPI";

const CreateItemPage = () => {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState({
    color: "red",
    material: "cotton",
  });
  const [total, setTotal] = useState(100);
  const [message, setMessage] = useState("");

  const calculatePrice = (feat) => {
    let price = 100;
    if (feat.color === "blue") price += 10;
    if (feat.material === "leather") price += 25;
    setTotal(price);
  };

  const handleChange = (key, value) => {
    const updated = { ...features, [key]: value };
    setFeatures(updated);
    calculatePrice(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createItem({ name, features, total_price: total });
    if (result.error) setMessage(result.error);
    else setMessage("✅ Item created successfully!");
  };

  return (
    <div>
      <h1>Create Custom Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Color:</label>
        <select
          value={features.color}
          onChange={(e) => handleChange("color", e.target.value)}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>

        <label>Material:</label>
        <select
          value={features.material}
          onChange={(e) => handleChange("material", e.target.value)}
        >
          <option value="cotton">Cotton</option>
          <option value="leather">Leather</option>
        </select>

        <p>Total Price: ${total}</p>
        <button type="submit">Create</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateItemPage;

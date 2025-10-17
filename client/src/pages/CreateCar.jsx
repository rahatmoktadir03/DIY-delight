import React, { useState } from "react";
import { createItem } from "../services/CustomItemsAPI";
import "../App.css";

const CreateCar = () => {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState({
    color: "black",
    roof: "base",
    wheels: "base",
  });
  const [total, setTotal] = useState(50000);
  const [message, setMessage] = useState("");

  const calculatePrice = (feat) => {
    let price = 50000;

    // Color pricing
    if (feat.color === "red") price += 5000;
    if (feat.color === "blue") price += 7000;
    if (feat.color === "silver") price += 3000;

    // Roof pricing
    if (feat.roof === "convertible") price += 15000;
    if (feat.roof === "panoramic") price += 10000;

    // Wheels pricing
    if (feat.wheels === "sport") price += 8000;
    if (feat.wheels === "premium") price += 12000;

    setTotal(price);
  };

  const handleChange = (key, value) => {
    const updated = { ...features, [key]: value };
    setFeatures(updated);
    calculatePrice(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("❌ Please enter a car name");
      return;
    }

    try {
      const result = await createItem({
        name,
        features,
        total_price: total,
      });

      if (result.error) {
        setMessage(`❌ ${result.error}`);
      } else {
        setMessage("✅ Car customization saved successfully!");
        // Reset form
        setName("");
        setFeatures({ color: "black", roof: "base", wheels: "base" });
        setTotal(50000);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div
      className="create-car-container"
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "30px",
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🏎️ Customize Your Bolt Bucket
      </h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Car Name:</label>
          <input
            type="text"
            placeholder="Enter your car name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Color:</label>
          <select
            value={features.color}
            onChange={(e) => handleChange("color", e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="black">Black (Base)</option>
            <option value="red">Red (+$5,000)</option>
            <option value="blue">Blue (+$7,000)</option>
            <option value="silver">Silver (+$3,000)</option>
            <option value="white">White (Base)</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Roof:</label>
          <select
            value={features.roof}
            onChange={(e) => handleChange("roof", e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="base">Standard Roof (Base)</option>
            <option value="panoramic">Panoramic Roof (+$10,000)</option>
            <option value="convertible">Convertible (+$15,000)</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Wheels:</label>
          <select
            value={features.wheels}
            onChange={(e) => handleChange("wheels", e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="base">Standard Wheels (Base)</option>
            <option value="sport">Sport Wheels (+$8,000)</option>
            <option value="premium">Premium Wheels (+$12,000)</option>
          </select>
        </div>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "30px 0",
            padding: "15px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "5px",
          }}
        >
          Total Price: ${total.toLocaleString()}
        </div>

        <button type="submit" style={{ width: "100%" }}>
          Create Custom Car
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "16px",
            padding: "10px",
            background: message.includes("✅")
              ? "rgba(0, 255, 0, 0.2)"
              : "rgba(255, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateCar;

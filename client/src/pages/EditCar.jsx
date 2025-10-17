import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItems, updateItem } from "../services/CustomItemsAPI";
import "../App.css";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [features, setFeatures] = useState({
    color: "black",
    roof: "base",
    wheels: "base",
  });
  const [total, setTotal] = useState(50000);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const cars = await getItems();
        const car = cars.find((c) => c.id === parseInt(id));
        if (car) {
          setName(car.name);
          setFeatures(car.features);
          setTotal(parseFloat(car.total_price));
        }
      } catch (error) {
        console.error("Error loading car:", error);
        setMessage("❌ Failed to load car data");
      } finally {
        setLoading(false);
      }
    };
    loadCar();
  }, [id]);

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
      const result = await updateItem(id, {
        name,
        features,
        total_price: total,
      });

      if (result.error) {
        setMessage(`❌ ${result.error}`);
      } else {
        setMessage("✅ Car updated successfully!");
        setTimeout(() => {
          navigate(`/customcars/${id}`);
        }, 1500);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "24px",
          marginTop: "100px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="edit-car-container"
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
        ✏️ Edit Your Car
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

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={() => navigate(`/customcars/${id}`)}
            style={{
              flex: 1,
              background: "#6b7280",
              border: "none",
              padding: "12px",
              borderRadius: "5px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              flex: 1,
              border: "none",
              padding: "12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Update Car
          </button>
        </div>
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

export default EditCar;

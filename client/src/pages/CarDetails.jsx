import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItems, deleteItem } from "../services/CustomItemsAPI";
import "../App.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const cars = await getItems();
        const foundCar = cars.find((c) => c.id === parseInt(id));
        setCar(foundCar);
      } catch (error) {
        console.error("Error loading car:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCar();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteItem(id);
        navigate("/customcars");
      } catch (error) {
        alert("Failed to delete car");
      }
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

  if (!car) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "24px",
          marginTop: "100px",
        }}
      >
        Car not found
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "30px",
        background: "rgba(0, 0, 0, 0.8)",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>{car.name}</h1>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Specifications</h2>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <strong>Color:</strong> {car.features?.color || "N/A"}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <strong>Roof:</strong> {car.features?.roof || "N/A"}
        </p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <strong>Wheels:</strong> {car.features?.wheels || "N/A"}
        </p>
      </div>

      <div
        style={{
          background: "rgba(74, 222, 128, 0.2)",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Total Price</h2>
        <p style={{ fontSize: "32px", fontWeight: "bold", color: "#4ade80" }}>
          ${parseFloat(car.total_price).toLocaleString()}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => navigate("/customcars")}
          style={{
            background: "#3b82f6",
            padding: "12px 30px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Back to Gallery
        </button>
        <button
          onClick={() => navigate(`/edit/${id}`)}
          style={{
            background: "#f59e0b",
            padding: "12px 30px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          style={{
            background: "#ef4444",
            padding: "12px 30px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarDetails;

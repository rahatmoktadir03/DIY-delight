import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, deleteItem } from "../services/CustomItemsAPI";
import "../App.css";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadCars = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setCars(data);
      setError("");
    } catch (err) {
      setError("Failed to load cars. Make sure the server is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteItem(id);
        loadCars();
      } catch (err) {
        alert("Failed to delete car");
        console.error(err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/customcars/${id}`);
  };

  useEffect(() => {
    loadCars();
  }, []);

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
        Loading cars...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "red",
          fontSize: "20px",
          marginTop: "100px",
          padding: "20px",
          background: "rgba(0, 0, 0, 0.7)",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "100px auto",
        }}
      >
        ❌ {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "40px",
          fontSize: "36px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        🏎️ Custom Cars Gallery
      </h1>

      {cars.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "white",
            background: "rgba(0, 0, 0, 0.7)",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <h2>No custom cars yet!</h2>
          <p>Click "CUSTOMIZE" to create your first car.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {cars.map((car) => (
            <div
              key={car.id}
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                borderRadius: "10px",
                padding: "20px",
                color: "white",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                transition: "transform 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h3 style={{ marginBottom: "15px", fontSize: "24px" }}>
                {car.name}
              </h3>

              <div style={{ marginBottom: "15px" }}>
                <p>
                  <strong>Color:</strong> {car.features?.color || "N/A"}
                </p>
                <p>
                  <strong>Roof:</strong> {car.features?.roof || "N/A"}
                </p>
                <p>
                  <strong>Wheels:</strong> {car.features?.wheels || "N/A"}
                </p>
              </div>

              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#4ade80",
                  marginBottom: "20px",
                }}
              >
                ${parseFloat(car.total_price).toLocaleString()}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
              >
                <button
                  onClick={() => handleViewDetails(car.id)}
                  style={{
                    background: "#3b82f6",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleEdit(car.id)}
                  style={{
                    background: "#f59e0b",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  style={{
                    background: "#ef4444",
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCars;

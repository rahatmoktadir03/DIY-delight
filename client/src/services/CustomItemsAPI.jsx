const API_URL = "/api/customcars";

export const getItems = async () => (await fetch(API_URL)).json();
export const createItem = async (item) =>
  (
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
  ).json();
export const updateItem = async (id, item) =>
  (
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
  ).json();
export const deleteItem = async (id) =>
  (await fetch(`${API_URL}/${id}`, { method: "DELETE" })).json();

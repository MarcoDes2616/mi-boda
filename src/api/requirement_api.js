import axiosInstance from "./axios";

// Fetch all requirements
export const fetchAllRequirements = async () => {
  try {
    const { data } = await axiosInstance.get("/requirement");
    return data;
  } catch (error) {
    console.error("Error fetching requirements:", error);
    throw error;
  }
};

export const fetchAllRequirementsByPrice = async () => {
  try {
    const { data } = await axiosInstance.get("/requirement/ordered-by-price");
    return data;
  } catch (error) {
    console.error("Error fetching requirements:", error);
    throw error;
  }
};
// Fetch a requirement by ID
export const fetchRequirementById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/requirement/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching requirement with ID ${id}:`, error);
    throw error;
  }
};

// Create a new requirement
export const createRequirement = async (requirementData) => {
  try {
    const { data } = await axiosInstance.post("/requirement", requirementData); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve el requerimiento creado
  } catch (error) {
    console.error("Error creating requirement:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Update a requirement by ID
export const updateRequirement = async (id, requirementData) => {
  try {
    const { data } = await axiosInstance.put(
      `/requirement/${id}`,
      requirementData
    ); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve el requerimiento actualizado
  } catch (error) {
    console.error(`Error updating requirement with ID ${id}:`, error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Delete a requirement by ID
export const deleteRequirement = async (id) => {
  try {
    await axiosInstance.delete(`/requirement/${id}`); // Asegúrate de que la ruta es correcta
  } catch (error) {
    console.error(`Error deleting requirement with ID ${id}:`, error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

import axiosInstance from './axios'; // Asegúrate de que la ruta es correcta

// Fetch all suppliers
export const fetchAllSuppliers = async () => {
  try {
    const { data } = await axiosInstance.get('/supplier'); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve un arreglo de proveedores
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Fetch a supplier by ID
export const fetchSupplierById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/supplier/${id}`); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve el proveedor correspondiente
  } catch (error) {
    console.error(`Error fetching supplier with ID ${id}:`, error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Create a new supplier
export const createSupplier = async (supplierData) => {
  try {
    const { data } = await axiosInstance.post('/supplier', supplierData); 
    return data; 
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error; 
  }
};

// Update a supplier by ID
export const updateSupplier = async (id, supplierData) => {
  try {
    const { data } = await axiosInstance.put(`/supplier/${id}`, supplierData); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve el proveedor actualizado
  } catch (error) {
    console.error(`Error updating supplier with ID ${id}:`, error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Delete a supplier by ID
export const deleteSupplier = async (id) => {
  try {
    await axiosInstance.delete(`/supplier/${id}`);
  } catch (error) {
    console.error(`Error deleting supplier with ID ${id}:`, error);
    throw error;
  }
};

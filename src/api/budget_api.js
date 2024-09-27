import axiosInstance from './axios'; 

// Fetch all requirements
export const fetchBudget = async () => {
  try {
    const { data } = await axiosInstance.get('/budget');
    return data;
  } catch (error) {
    console.error("Error fetching requirements:", error);
    throw error;
  }
};

// Create a new requirement
export const createBudget = async (budgetData) => {
  try {
    const { data } = await axiosInstance.post('/budget', budgetData);
    return data;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
};
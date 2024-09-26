import axiosInstance from './axios'; // Asegúrate de que la ruta es correcta

// Fetch all notes
export const fetchAllNotes = async () => {
  try {
    const { data } = await axiosInstance.get('/note'); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve un arreglo de notas
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Fetch a note by ID
export const fetchNoteById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/note/${id}`); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve la nota correspondiente
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Create a new note
export const createNote = async (noteData) => {
  try {
    const { data } = await axiosInstance.post('/note', noteData); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve la nota creada
  } catch (error) {
    console.error("Error creating note:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Update a note by ID
export const updateNote = async (id, noteData) => {
  try {
    const { data } = await axiosInstance.put(`/note/${id}`, noteData); // Asegúrate de que la ruta es correcta
    return data; // Asumiendo que la API devuelve la nota actualizada
  } catch (error) {
    console.error(`Error updating note with ID ${id}:`, error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

// Delete a note by ID
export const deleteNote = async (id) => {
  try {
    await axiosInstance.delete(`/note/${id}`); // Asegúrate de que la ruta es correcta
  } catch (error) {
    console.error(`Error deleting note with ID ${id}:`, error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

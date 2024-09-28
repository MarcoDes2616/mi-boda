import React, { createContext, useState } from "react";
import { createSupplier, deleteSupplier, fetchAllSuppliers, updateSupplier } from "../api/supplier_api";
import { fetchAllRequirements } from "../api/requirement_api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialValuesProvider = {
    full_name: "",
    phone: "",
    price: ""
  }
  const [suppliers, SetSuppliers] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [providerData, setProviderData] = useState(initialValuesProvider);

  const fetchSupplier = async () => {
    try {
      const response = await fetchAllSuppliers();
      SetSuppliers(response);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };
  const handleEdit = async (id) => {
    try {
      await updateSupplier(id);
      fetchSupplier();
    } catch (error) {
      Alert.alert("Error", "Hubo un error al agregar el invitado.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      fetchSupplier();
    } catch (error) {
      Alert.alert("Error", "Hubo un error al agregar el invitado.");
    }
  };

  const fetchRequirements = async () => {
    try {
      const response = await fetchAllRequirements();
      setRequirements(response);
    } catch (error) {
      console.error("Error fetching requirements:", error);
    }
  };

  const handleSaveProvider = async() => {
    await createSupplier({ 
      requirementId: selectedRequirement.id, 
     ...providerData 
     })
    fetchRequirements()
    fetchSupplier()
    setModalVisible(false);
    setProviderData(initialValuesProvider);
  };

  const data = {
    suppliers,
    SetSuppliers,
    fetchSupplier,
    handleEdit,
    handleDelete,
    handleSaveProvider,
    requirements,
    fetchRequirements,
    setSelectedRequirement,
    selectedRequirement,
    providerData, 
    setProviderData,
    modalVisible,
    setModalVisible
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

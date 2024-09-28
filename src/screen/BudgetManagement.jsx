import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { fetchBudget, createBudget } from '../api/budget_api';
import {fetchAllRequirementsByPrice} from "../api/requirement_api"
import { PieChart } from 'react-native-chart-kit';
import Container from '../components/custon_components/Container';
import color from '../constants/color';
import { FontAwesome } from "@expo/vector-icons";

const BudgetManagement = () => {
    const [totalBudget, setTotalBudget] = useState(0);
    const [requirements, setRequirements] = useState([]);
    const [totalRequirementCost, setTotalRequirementCost] = useState(0);
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
    const [amount, setAmount] = useState(''); // State for input value

    useEffect(() => {
        fetchBudgetData();
        fetchRequirementsData();
    }, []);

    const fetchBudgetData = async () => {
        try {
            const response = await fetchBudget();
            setTotalBudget(response.totalBudget);
        } catch (error) {
            console.error('Error fetching budget:', error);
            setTotalBudget(0);
        }
    };

    const fetchRequirementsData = async () => {
        try {
            const requirementsData = await fetchAllRequirementsByPrice();
            setRequirements(requirementsData);
            const totalCost = requirementsData.reduce((sum, req) => sum + +req.price, 0);
            setTotalRequirementCost(totalCost);
        } catch (error) {
            console.error('Error fetching requirements:', error);
            setTotalRequirementCost(0);
        }
    };

    const budgetExecution = totalBudget ? (totalRequirementCost / totalBudget) * 100 : 0;

    const data = [
        {
            name: 'Usado',
            population: totalRequirementCost,
            color: color.sageGreen,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Restante',
            population: totalBudget - totalRequirementCost,
            color: color.wine,
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    const renderRequirement = ({ item }) => (
        <View style={styles.requirementItem}>
            <Text style={styles.requirementText}>{item.requirement}</Text>
            <Text style={styles.requirementPrice}>${item.price}</Text>
        </View>
    );

    const handleCreateBudget = async () => {
        if (amount) {
            try {
                await createBudget({ amount: parseFloat(amount) }); // Assuming createBudget takes an object with amount
                setAmount(''); // Clear the input
                setModalVisible(false); // Close the modal
                fetchBudgetData(); // Refresh the budget data
            } catch (error) {
                console.error('Error creating budget:', error);
            }
        }
    };

    return (
        <Container>
            <Text style={styles.header}>Ejecución de presupuesto: {budgetExecution}%</Text>

            {totalBudget > 0 ? (
                <PieChart
                    data={data}
                    width={300}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            ) : (
                <Text style={styles.noDataText}>
                    El presupuesto no ha sido definido.
                </Text>
            )}

            <Text style={styles.subHeader}>Total de Requerimientos {totalRequirementCost}$</Text>
            {requirements.length > 0 ? (
                <FlatList
                    data={requirements}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderRequirement}
                />
            ) : (
                <Text style={styles.noDataText}>No hay requerimientos registrados.</Text>
            )}

            {/* Floating Button */}
            <TouchableOpacity 
                style={styles.floatingButton} 
                onPress={() => setModalVisible(true)}
            >
                <FontAwesome name="plus" size={24} color={color.palePink} />
            </TouchableOpacity>

            {/* Modal for Budget Input */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Agregar Presupuesto</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Monto"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleCreateBudget}
                    >
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Container>
    );
};

export default BudgetManagement;

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    subHeader: {
        fontSize: 20,
        marginVertical: 10,
    },
    requirementItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    requirementText: {
        fontSize: 18,
    },
    requirementPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noDataText: {
        fontSize: 16,
        color: '#999',
        marginTop: 20,
        textAlign: 'center',
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: color.wine,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        elevation: 5,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        width: '100%',
    },
    button: {
        backgroundColor: color.sageGreen,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        marginTop: 10,
    },
});

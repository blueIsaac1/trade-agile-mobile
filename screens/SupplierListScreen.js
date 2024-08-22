import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SupplierListScreen = ({ navigation }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const existingSuppliers = await AsyncStorage.getItem('suppliers');
        const suppliers = existingSuppliers ? JSON.parse(existingSuppliers) : [];
        setSuppliers(suppliers);
      } catch (error) {
        console.error('Failed to load suppliers', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este fornecedor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: async () => {
          try {
            const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id);
            await AsyncStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
            setSuppliers(updatedSuppliers);
          } catch (error) {
            console.error('Failed to delete supplier', error);
          }
        }},
      ]
    );
  };

  const handleEdit = (supplier) => {
    navigation.navigate('Atualizar Fornecedor', {
      supplier,
      onUpdateSupplier: updatedSupplier => {
        setSuppliers(prevSuppliers => prevSuppliers.map(s => 
          s.id === updatedSupplier.id ? updatedSupplier : s
        ));
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>Nome: {item.name}</Text>
      <Text style={styles.contact}>Contato: {item.contact}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={suppliers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum fornecedor cadastrado.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#DD4E50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
});

export default SupplierListScreen;

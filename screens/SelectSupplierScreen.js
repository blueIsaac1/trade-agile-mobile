// SelectSupplierScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectSupplierScreen = ({ route, navigation }) => {
  const { onSelectSupplier } = route.params;
  const [suppliers, setSuppliers] = useState([]);
  
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const existingSuppliers = await AsyncStorage.getItem('suppliers');
        const suppliers = existingSuppliers ? JSON.parse(existingSuppliers) : [];
        setSuppliers(suppliers);
      } catch (error) {
        console.error('Failed to load suppliers', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSelectSupplier = (supplierId) => {
    onSelectSupplier(supplierId);
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelectSupplier(item.id)}>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={suppliers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum fornecedor disponível.</Text>}
      />
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
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
});

export default SelectSupplierScreen;

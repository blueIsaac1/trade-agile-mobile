import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import RegisterProductScreen from './screens/RegisterProductScreen';
import UpdateProductScreen from './screens/UpdateProductScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterSupplierScreen from './screens/RegisterSupplierScreen';
import SupplierListScreen from './screens/SupplierListScreen';
import SelectSupplierScreen from './screens/SelectSupplierScreen';
import ClientListScreen from './screens/ClientListScreen';
import RegisterClientScreen from './screens/RegisterClientScreen';
import ProductScreen_admin from './screens/ProductScreen_admin';
import UpdateSupplierScreen from './screens/UpdateSupplierScreen';
import UpdateClientScreen from './screens/UpdateClientScreen';
import ImageGallery from './screens/ImagesGalleryScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastre-se" component={RegisterScreen} />
        <Stack.Screen name="Registro de Produtos" component={RegisterProductScreen} />
        <Stack.Screen name="Produtos" component={ProductScreen} />
        <Stack.Screen name="Produtos (Admin)" component={ProductScreen_admin} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Atualizar Produto" component={UpdateProductScreen} />
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Registro de Fornecedores" component={RegisterSupplierScreen} />
        <Stack.Screen name="Lista de Fornecedores" component={SupplierListScreen} />
        <Stack.Screen name="SelectSupplier" component={SelectSupplierScreen} />
        <Stack.Screen name="Registro de Clientes" component={RegisterClientScreen} />
        <Stack.Screen name="Lista de Clientes" component={ClientListScreen} />
        <Stack.Screen name="Atualizar Fornecedor" component={UpdateSupplierScreen} />
        <Stack.Screen name="Atualizar Cliente" component={UpdateClientScreen} />
        <Stack.Screen name="Galeria de Imagens" component={ImageGallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

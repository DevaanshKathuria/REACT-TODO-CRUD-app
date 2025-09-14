import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import All from './src/screens/All';
import Completed from './src/screens/Completed';
import Pending from './src/screens/Pending';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <>
    <NavigationContainer>
      <Tab.Navigator initialRouteName='All'>
        <Tab.Screen name="All" component={All} />
        <Tab.Screen name="Pending" component={Pending} />
        <Tab.Screen name="Completed" component={Completed} />
      </Tab.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

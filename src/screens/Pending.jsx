import { View, Text, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Pending = () => {
  const [pendingTodos, setPendingTodos] = useState([]);

const fetchData = async () => {
  try {
    const data = await AsyncStorage.getItem('todos');
    if (data) {
      const allTodos = JSON.parse(data);
      const pending = allTodos.filter(todo => !todo.completed);
      setPendingTodos(pending);
    }
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View>
      <Text>Pending Todos</Text>
      <FlatList 
        data={pendingTodos}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default Pending;
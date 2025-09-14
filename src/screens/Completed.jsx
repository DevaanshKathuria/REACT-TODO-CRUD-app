import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Completed = () => {
  const [completedTodos, setCompletedTodos] = useState([]);

const fetchData = async () => {
  try {
    const data = await AsyncStorage.getItem('todos');
    if (data) {
      const allTodos = JSON.parse(data);
      const completed = allTodos.filter(todo => todo.completed);
      setCompletedTodos(completed);
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
      <Text>Completed Todos</Text>
      <FlatList 
        data={completedTodos}
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

export default Completed;
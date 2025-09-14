import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const All = () => {
    const [list, setList] = useState([]);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('todos')
            .then(data => {
                if(data) {
                    setList(JSON.parse(data));
                }
            })
            .catch(err => console.error(err));
        }
        fetchData();
    }, []);

    async function saveData(newList) {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(newList));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    function addTodo() {
        if (inputText.trim()) {
            const newTodo = {
                id: Date.now().toString(),
                title: inputText.trim(),
                completed: false,
                created: Date.now(),
                updated: Date.now()
            };
            const updatedList = [...list, newTodo];
            setList(updatedList);
            saveData(updatedList);
            setInputText('');
        }
    };

    function toggleTodo(id) {
        const updatedList = list.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                    updated: Date.now()
                };
            }
            return todo;
        });
        setList(updatedList);
        saveData(updatedList);
    };

    return (
        <View>
            <TextInput 
                placeholder='Title'
                value={inputText}
                onChangeText={setInputText}
            />
            <Button title="Add Todo" onPress={addTodo} />
            <FlatList 
                data={list}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Button title={item.completed ? "Completed" : "Pending"} onPress={() => toggleTodo(item.id)} />
                    </View>
            )}
            keyExtractor={item => item.id.toString()}
            />
        </View>
  )
}

export default All;
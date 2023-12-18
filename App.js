import { useEffect, useState } from 'react';
import {Button, StyleSheet, ImageBackground, View, FlatList } from 'react-native';
import TodoList from './todoList';
import TodoInput from './todoInput';
import { StatusBar } from 'expo-status-bar';

//DB
import { createTable, insertItem, getAllItems, deleteItem } from './database/db';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAllTodoList = () =>{
    getAllItems((items) => {
      setTodoList(items);
    });
  }
  useEffect(() => {
    // Create the 'items' table if it doesn't exist
    createTable(); 

    // Retrieve all items from the database
    fetchAllTodoList();
  }, []);

  const addTodoHandler = async (todoValue) => {
    try {
      // Insert an item into the database
      insertItem(todoValue, (itemId) => {
        console.log('Item inserted with ID:', itemId);
      });

      fetchAllTodoList();
    } catch (error) {
      console.log("addTodoHandler" + error);
    }
  }

  function removeTodo(todoListArrayIndex) {
    deleteItem(todoListArrayIndex, (rowsAffected) => {
      if (rowsAffected > 0) {
        console.log('Item deleted successfully');
        fetchAllTodoList();
      } else {
        console.log('No item found with the specified ID');
      }
    });
  }

  function openModalHandler() {
    setIsModalVisible(true);
  }

  function closeModalHandler() {
    setIsModalVisible(false);
  }

  return (
    <>
      <StatusBar style='dark' />
        <View style={styles.appContainer}>

          {isModalVisible &&
            <TodoInput modalVisible={isModalVisible} addTodoHandler={addTodoHandler} closeModal={closeModalHandler} />
          }

          <View style={styles.todoContainer}>
            <FlatList
              data={todoList}
              renderItem={(itemData) => {
                return <TodoList todoListValue={itemData.item.name} todoListId={itemData.item.id} onDelete={() => removeTodo(itemData.item.id)} />
              }}
            />
          </View>
          <Button title='Add New Todo List' color="#2B97D4" onPress={openModalHandler} />
            {/* <StyledButton onPress={openModalHandler} iconName="plus" name="Add New" color="#5e0acc" /> */}
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    padding: 20,
    flex: 1,
    backgroundColor: '#ffffff',
    color:'black'
  },
  todoContainer: {
    flex: 4
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' for different resizing options
    justifyContent: 'center', // optional: align content vertically
  },
});

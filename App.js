import { useEffect, useState } from 'react';
import { Button, StyleSheet, ImageBackground, View, FlatList } from 'react-native';
import TodoList from './todoList';
import TodoInput from './todoInput';
import { StatusBar } from 'expo-status-bar';

//DB
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');


export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
      );
    });
  };

  const insertItem = (name, callback) => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO items (name) VALUES (?);', [name], (_, result) => {
        callback(result.insertId);
      });
    });
  };

  const deleteItem = (itemId, callback) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM items WHERE id = ?;', [itemId], (_, result) => {
        callback(result.rowsAffected);
      });
    });
  };

  const getAllItems = (callback) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM items;', [], (_, result) => {
        callback(result.rows._array);
      });
    });
  };

  useEffect(() => {
    createTable(); // Create the 'items' table if it doesn't exist

    // Retrieve all items from the database
    getAllItems((items) => {
      console.log('All items:', items);
      setTodoList(items);
    });
  }, []);

  const addTodoHandler = async (todoValue) => {
    try {
      // setTodoList((todoList) => [...todoList, [todoValue]]);
      // Insert an item into the database
      insertItem(todoValue, (itemId) => {
        console.log('Item inserted with ID:', itemId);
      });

      getAllItems((items) => {
        setTodoList(items);
      });
    } catch (error) {
      console.log("addTodoHandler" + error);
    }
  }

  function removeTodo(todoListArrayIndex) {
    // const newTodoLists = todoList.filter((el, i) => i != todoListArrayIndex)
    // setTodoList(newTodoLists);
    deleteItem(todoListArrayIndex, (rowsAffected) => {
      if (rowsAffected > 0) {
        console.log('Item deleted successfully');
        getAllItems((items) => {
          setTodoList(items);
        });
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
      <StatusBar style='light' />

      <ImageBackground
        source={require('./assets/images/home-page-background.jpeg')}
        style={styles.backgroundImage}
      >
        <View style={styles.appContainer}>
          <Button title='Add New Todo List' color="#5e0acc" onPress={openModalHandler} />

          {isModalVisible &&
            <TodoInput modalVisible={isModalVisible} addTodoHandler={addTodoHandler} closeModal={closeModalHandler} />
          }

          <View style={styles.todoContainer}>
            <FlatList
              data={todoList}
              renderItem={(itemData) => {
                return <TodoList todoListValue={itemData.item.name} onDelete={() => removeTodo(itemData.item.id)} />
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    padding: 20,
    flex: 1,
    // backgroundColor: '#1A0037'
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

import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, ImageBackground, View, FlatList } from 'react-native';
import TodoList from './todoList';
import TodoInput from './todoInput';
import { StatusBar } from 'expo-status-bar';

//DB
import SQLite from 'react-native-sqlite-storage';


export default function App() {
  const [database, setDatabase] = useState();
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // useEffect(() => {

  //   const db = SQLite.openDatabase(
  //     {
  //       name: 'TodoDB.db',
  //       location: 'default',
  //     },
  //     () => {
  //       setDatabase(db);
  //       console.log('Database opened')
  //     },
  //     (error) => console.error('Error opening database: ', error)
  //   );

  //   createTable();

  //   // Close the database connection when the component unmounts
  //   return () => {
  //     if (db) {
  //       db.close(() => console.log('Database closed'));
  //     }
  //   };

  // }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS TodoList (ID INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)",
        [],
        () => console.log('TodoList Table created successfully'),
        (error) => console.error('Error creating table: ', error)
      )
    })
  }

  const addTodoHandler = async (todoValue) => {
    try {
      console.log("todoValue", todoValue);
      setTodoList((todoList) => [...todoList, [todoValue]]);
      // await db.transaction(async (tx) => {
      //   await tx.executeSql(
      //     "INSERT INTO Users (message) VALUES (?)",
      //     [todoValue]
      //   );
      // });

    } catch (error) {
      console.log("addTodoHandler" + error);
    }
  }

  function removeTodo(todoListArrayIndex) {
    const newTodoLists = todoList.filter((el, i) => i != todoListArrayIndex)
    setTodoList(newTodoLists);
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
                return <TodoList todoListValue={itemData.item} onDelete={() => removeTodo(itemData.index)} />
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

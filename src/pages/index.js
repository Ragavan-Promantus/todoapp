import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import TodoList from './todoList';
import TodoInput from './todoInput';
import { StatusBar } from 'expo-status-bar';
import ListHeader from '../navigation/ListHeader';
import { useToast } from "react-native-toast-notifications";

//DB
import { createTable, insertItem, getAllItems, deleteItem, recreateTable } from '../../database/db';

export default function App() {
    const { toast } = useToast();
    const [todoList, setTodoList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const headerRightSideMenu = [
        { text: "Edit", onPress: () => tost() },
        { icon: "three-dots-more-indicator", onPress: () => console.log("More icon pressed") }
    ];

    const fetchAllTodoList = () => {
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

    const tost = () => {
        console.log("-------------------");
        toast.show("Task finished successfully");
    }

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
                    <TodoInput
                        modalVisible={isModalVisible}
                        addTodoHandler={addTodoHandler}
                        closeModal={closeModalHandler}
                    />
                }

                <ListHeader title={"Notes"} headerRightSide={headerRightSideMenu} />
                <View style={styles.todoContainer}>
                    <FlatList
                        data={todoList}
                        renderItem={(itemData) => {
                            return <TodoList todoListValue={itemData.item.message} todoHeading={itemData.item.heading} onDelete={() => removeTodo(itemData.item.id)} />
                        }}
                    />
                </View>
                <Button title='Add New' color="#2B97D4" onPress={openModalHandler} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    appContainer: {
        paddingTop: 40,
        padding: 20,
        flex: 1,
        backgroundColor: '#ffffff',
        color: 'black'
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

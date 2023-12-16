import { Button, StyleSheet, TextInput, View, Modal, Image } from 'react-native';
import { useState } from 'react';

function TodoInput(props) {
    const [todoValue, setTodoValue] = useState("");

    function todoInputHandler(value) {
        setTodoValue(value);
    }

    function passValueToProps() {
        props.addTodoHandler(todoValue);
        props.closeModal();
    }

    return (
        <Modal visible={props.modalVisible} animationType='fade'>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('./assets/images/3dlogo.jpg')}/>

                <TextInput onChangeText={todoInputHandler} style={styles.textInput} placeholder='Todo List' />

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button onPress={props.closeModal} color="#f31282" title='Cancel' />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={passValueToProps} color="#5e0acc" title='Add Todo' />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 0,
        flex: 1,
        padding:16,
        backgroundColor:'transparent'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '100%',
        padding: 2,
        borderRadius:6,
        backgroundColor:'#e4d0ff'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop:16
    },
    button:{
        width:100,
        marginHorizontal:8
    },
    image:{
        width:'100%',
        height:'40%',
        margin:20
    }
})

module.exports = TodoInput;
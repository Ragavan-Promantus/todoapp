import { StyleSheet, Text, View, Pressable } from 'react-native';

function TodoList(props) {
    return (
        <View style={styles.todoItemsView}>
            <Pressable onPress={props.onDelete}
                android_ripple={{color:'#dddddd'}}
                style={({pressed}) => pressed && styles.pressedItem}
            >
                <Text style={styles.todoText}>{props.todoListValue}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    todoItemsView: {
        marginTop: 15,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
    },
    todoText: {
        color: 'white',
        margin: 8,
        padding: 3,
    },
    pressedItem:{
        backgroundColor:'red',
        borderRadius: 6,
    }
})

module.exports = TodoList;
import { StyleSheet, Text, View, Pressable } from 'react-native';

function TodoList(props) {
    return (
        <View style={styles.todoItemsView}>
            <Pressable onPress={props.onDelete}
                android_ripple={{color:'#dddddd'}}
                style={({pressed}) => pressed && styles.pressedItem}
            >
                <Text style={styles.todoTextTitle}>{props.todoListId}</Text>
                <Text style={styles.todoText}>{props.todoListValue}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    todoItemsView: {
        marginTop: 15,
        borderRadius: 6,
        backgroundColor: '#60BBEE',
    },
    todoText: {
        color: 'white',
        padding: 3,
        paddingBottom:8,
        paddingLeft:10
    },
    todoTextTitle: {
        color: 'black',
        fontSize:20,
        padding:2,
        paddingLeft:10
    },
    pressedItem:{
        backgroundColor:'red',
        borderRadius: 6,
    }
})

module.exports = TodoList;
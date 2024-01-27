import { StyleSheet, Text, View, Pressable } from 'react-native';

function TodoList(props) {
    return (
        <View style={styles.todoItemsView}>
            <Pressable onPress={props.onDelete}
                android_ripple={{color:'#dddddd'}}
                style={({pressed}) => pressed && styles.pressedItem}
            >
                <Text style={styles.todoTextTitle}>{props.todoHeading}</Text>
                <Text style={styles.todoText}>{props.todoListValue}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    todoItemsView: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
    },
    todoText: {
        color: '#878080',
        padding: 3,
        paddingBottom:8,
        paddingLeft:10,
        fontSize:14
    },
    todoTextTitle: {
        color: 'black',
        fontSize:18,
        padding:2,
        paddingLeft:10,
        fontWeight:'bold'
    },
    pressedItem:{
        backgroundColor:'red',
        borderRadius: 6,
    }
})

module.exports = TodoList;
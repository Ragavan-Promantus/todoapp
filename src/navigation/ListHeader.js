import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-ico-material-design';

export default function ListHeader(props) {

  const headerRightMenu = props.headerRightSide.length > 0 ? props.headerRightSide : [];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
        }}
      >
        {props.title}
      </Text>

      <View style={{ flexDirection: 'row' }}>

        {headerRightMenu.map((v, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={i == headerRightMenu.length - 1 ? { marginRight: 0 } : { marginRight: 20 }}
              onPress={v.onPress}
            >
              {v.icon && v.icon !== "" ? <Icon name={v.icon} size={24} /> : v.text && v.text !== "" ? <Text>{v.text}</Text> : <></>}
            </TouchableOpacity>
          );
        })}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: 'lightgray'
  },
  item: {
    flex: 0,
    flexDirection: 'row',
    alignContent: 'center',
    width: '50%'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  icon: {
    // ma
  }
});
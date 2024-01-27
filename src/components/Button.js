import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const StyledButton = ({ onPress, name, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', color:"#5e0acc" }}>
      <Icon name={iconName} size={25} color="#900" />
      <Text style={{ marginLeft: 10 }}>{name}</Text>
    </TouchableOpacity>
  );
};

export default StyledButton;

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

export default function DeliveryDetails() {
  return <View />;
}

DeliveryDetails.navigationOptions = ({ navigation }) => ({
  headerShown: 'screen',
  title: 'Detalhes da encomenda',

  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

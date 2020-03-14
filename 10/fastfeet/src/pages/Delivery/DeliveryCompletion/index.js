import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Background,
  DeliveryContainer,
  ViewPhoto,
  CaptureButton,
  SendButton,
  View,
} from './styles';

import api from '~/services/api';

export default function DeliveryCompletion({ navigation }) {
  const [cameraCurrent, setCameraCurrent] = useState();
  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = useState(true);

  const data = navigation.getParam('data');

  async function handleTakeSignature() {
    try {
      const options = { quality: 0.5, base64: true };
      const { uri } = await cameraCurrent.takePictureAsync(options);

      setPhoto(uri);
      setVisible(false);

      console.tron.log(photo);
    } catch (err) {
      Alert.alert('Falha', 'Captura da foto falhou.');
    }
  }

  async function handleSendSignature() {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photo,
        type: 'image/png',
        name: 'signature.png',
      });

      await api.put(
        `deliverymen/${data.deliveryman.id}/delivered/${data.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Alert.alert(
        'Sucesso',
        'Assinatura enviada com sucesso',
        [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert('Falha', 'Erro ao enviar, tente mais tarde.');
    }
  }

  return (
    <Container>
      <Background />
      <DeliveryContainer>
        <ViewPhoto>
          <RNCamera
            ref={camera => setCameraCurrent(camera)}
            style={{
              top: 55,
              flex: 1,
              alignItems: 'center',
            }}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera',
              message: 'Precisamos da sua permissão para usar a câmera.',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}
          />
        </ViewPhoto>

        <View />
        <CaptureButton onPress={handleTakeSignature}>
          <Icon name="photo-camera" size={50} color="#fff" />
        </CaptureButton>

        <SendButton onPress={handleSendSignature}>Enviar</SendButton>
      </DeliveryContainer>
    </Container>
  );
}

DeliveryCompletion.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar entrega',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  ),
});

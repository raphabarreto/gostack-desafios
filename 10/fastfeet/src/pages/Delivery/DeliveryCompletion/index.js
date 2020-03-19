import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  Background,
  DeliveryContainer,
  ViewPhoto,
  CaptureButton,
  SendButton,
  View,
} from './styles';

export default function DeliveryCompletion({ navigation }) {
  const [cameraCurrent, setCameraCurrent] = useState();
  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = useState(true);

  const data = navigation.getParam('data');

  async function handleTakeSignature() {
    try {
      const options = {
        quality: 0.8,
        base64: false,
        width: 800,
        forceUpOrientation: true,
        fixOrientation: true,
      };
      const { uri } = await cameraCurrent.takePictureAsync(options);

      setPhoto(uri);
      setVisible(false);
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
      Alert.alert('Falha', 'Erro ao capturar assinatura, tente novamente.');
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
              message: 'Este app necessita da câmera para esta funcionalidade.',
              buttonPositive: 'Permitir',
              buttonNegative: 'Cancelar',
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

DeliveryCompletion.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

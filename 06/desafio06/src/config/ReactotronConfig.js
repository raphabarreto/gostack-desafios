import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.2' })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  tron.clear();
}

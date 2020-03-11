import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignOut,
  })
);

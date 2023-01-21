import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import store from './src/core/store';
import {StoreProvider} from 'easy-peasy';
import AppNavigator from './src/core/navigators';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <StoreProvider store={store}>
      <AppNavigator />
      <SafeAreaView style={backgroundStyle}>{/*<Test />*/}</SafeAreaView>
    </StoreProvider>
  );
};

export default App;

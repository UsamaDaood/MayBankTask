import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppNavigator from './navigation/appNavigator';
import {Provider} from 'react-redux';
import {createStore} from './config/store';
import {PersistGate} from 'redux-persist/integration/react';
import Loader from './common/loader';
import Toast from 'react-native-toast-message';
import {persistStore} from 'redux-persist';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export const {store} = createStore();
let persistor = persistStore(store);
function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top']}
        style={{
          flex: 1,
        }}>
        <NavigationContainer>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppNavigator />
              <Loader />
              <Toast position="top" topOffset={50} />
            </PersistGate>
          </Provider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;

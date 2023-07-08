import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import Color from '../libs/Colors';
import {PRIMARY_FONT_REGULAR} from '../constants/fonts';
import {responsiveFontSize} from '../libs/responsiveFont';
import SplashScreen from '../screens/Splash';
import MapSearchScreen from '../screens/MapSearch';
import SearchHistory from '../screens/SearchHistry';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MapSearchScreen" component={MapSearchScreen} />
      <Stack.Screen name="SearchHistory" component={SearchHistory} />
    </Stack.Navigator>
  );
}

export default () => <AppNavigator />;

import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Colors from '../../libs/Colors';

interface SplashProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashProps> = ({navigation}) => {
  useEffect(() => {
    handlingSplash();
  }, []);

  // Getting Go to Screen
  const goToScreen = async () => {
    return 'MapSearchScreen';
  };

  // Handling Splash Screen
  const handlingSplash = () => {
    setTimeout(async () => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: await goToScreen(),
          },
        ],
      });
    }, 2500);
  };

  return (
    <View style={styles.centered}>
      <Image
        source={require('../../../assets/images/ic_logo.png')}
        style={{width: 300, height: 250, borderRadius: 10}}
        resizeMode={'contain'}
      />
      <Text style={styles.title}>Test Task MayBank</Text>
      <Text style={styles.subTitle}>Let's start</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
  britainTextStyle: {
    color: Colors.primaryColor,
  },
  title: {
    fontSize: 38,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 2,
  },
  subTitle: {
    color: Colors.primaryColor,
    fontSize: 15,
    fontWeight: '300',
    marginTop: 20,
  },
});

export default SplashScreen;

import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const SplashTrial = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplashScreen) {
    return (
      <ImageBackground source={require('./assets/splash.png')} style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Animatable.Text animation="fadeIn" style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
            My Awesome App
          </Animatable.Text>
          <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.7)']} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%' }} />
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ alignSelf: 'center', marginTop: 50 }}>Welcome to My Awesome App!</Text>
    </View>
  );
};

export default SplashTrial;
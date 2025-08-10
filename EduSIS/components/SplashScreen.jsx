import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Animated, 
  Dimensions,
  StatusBar
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Multiple animation refs for different elements
  const fadeMain = useRef(new Animated.Value(0)).current;
  const fadeE1 = useRef(new Animated.Value(0)).current;
  const fadeD = useRef(new Animated.Value(0)).current;
  const fadeU = useRef(new Animated.Value(0)).current;
  const fadeS1 = useRef(new Animated.Value(0)).current;
  const fadeI = useRef(new Animated.Value(0)).current;
  const fadeS2 = useRef(new Animated.Value(0)).current;
  const fadeTagline = useRef(new Animated.Value(0)).current;
  const fadeArt1 = useRef(new Animated.Value(0)).current;
  const fadeArt2 = useRef(new Animated.Value(0)).current;
  const fadeArt3 = useRef(new Animated.Value(0)).current;
  const fadeArt4 = useRef(new Animated.Value(0)).current;
  
  const scaleMain = useRef(new Animated.Value(0.5)).current;
  const rotateArt = useRef(new Animated.Value(0)).current;
  const slideArt1 = useRef(new Animated.Value(-50)).current;
  const slideArt2 = useRef(new Animated.Value(50)).current;
  const slideArt3 = useRef(new Animated.Value(-30)).current;
  const slideArt4 = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    StatusBar.setHidden(true);

    // Staggered artistic entrance animations
    const letterDelay = 150;
    
    Animated.sequence([
      // Logo entrance
      Animated.parallel([
        Animated.timing(fadeMain, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(scaleMain, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }),
      ]),
      
      // Letters appear one by one in artistic sequence
      Animated.parallel([
        Animated.timing(fadeE1, { toValue: 1, duration: 400, delay: 0, useNativeDriver: true }),
        Animated.timing(fadeD, { toValue: 1, duration: 400, delay: letterDelay, useNativeDriver: true }),
        Animated.timing(fadeU, { toValue: 1, duration: 400, delay: letterDelay * 2, useNativeDriver: true }),
        Animated.timing(fadeS1, { toValue: 1, duration: 400, delay: letterDelay * 3, useNativeDriver: true }),
        Animated.timing(fadeI, { toValue: 1, duration: 400, delay: letterDelay * 4, useNativeDriver: true }),
        Animated.timing(fadeS2, { toValue: 1, duration: 400, delay: letterDelay * 5, useNativeDriver: true }),
      ]),
      
      // Artistic elements and tagline
      Animated.parallel([
        Animated.timing(fadeTagline, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(fadeArt1, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(slideArt1, { toValue: 0, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeArt2, { toValue: 1, duration: 800, delay: 200, useNativeDriver: true }),
        Animated.timing(slideArt2, { toValue: 0, duration: 800, delay: 200, useNativeDriver: true }),
        Animated.timing(fadeArt3, { toValue: 1, duration: 800, delay: 400, useNativeDriver: true }),
        Animated.timing(slideArt3, { toValue: 0, duration: 800, delay: 400, useNativeDriver: true }),
        Animated.timing(fadeArt4, { toValue: 1, duration: 800, delay: 600, useNativeDriver: true }),
        Animated.timing(slideArt4, { toValue: 0, duration: 800, delay: 600, useNativeDriver: true }),
      ])
    ]).start();

    // Continuous rotation for artistic elements
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateArt, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    const timer = setTimeout(() => {
      StatusBar.setHidden(false);
      navigation.replace('Login');
    }, 4000);

    return () => {
      clearTimeout(timer);
      rotateAnimation.stop();
    };
  }, []);

  const spin = rotateArt.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Artistic background shapes */}
      <Animated.View style={[styles.artShape1, { 
        transform: [{ rotate: spin }],
        opacity: fadeArt1
      }]} />
      
      <Animated.View style={[styles.artShape2, { 
        transform: [{ rotate: spin }, { scale: 0.8 }],
        opacity: fadeArt2
      }]} />

      {/* Main logo in center */}
      <Animated.View style={[
        styles.logoContainer,
        {
          opacity: fadeMain,
          transform: [{ scale: scaleMain }]
        }
      ]}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      {/* Scattered artistic letters spelling EDUSIS */}
      <Animated.Text style={[styles.letterE, { 
        opacity: fadeE1,
        color: '#FF6B6B' // Coral red
      }]}>E</Animated.Text>
      
      <Animated.Text style={[styles.letterD, { 
        opacity: fadeD,
        color: '#4ECDC4', // Turquoise
        transform: [{ rotate: '15deg' }]
      }]}>D</Animated.Text>
      
      <Animated.Text style={[styles.letterU, { 
        opacity: fadeU,
        color: '#45B7D1', // Sky blue
        transform: [{ rotate: '-10deg' }]
      }]}>U</Animated.Text>
      
      <Animated.Text style={[styles.letterS1, { 
        opacity: fadeS1,
        color: '#96CEB4', // Mint green
        transform: [{ rotate: '20deg' }]
      }]}>S</Animated.Text>
      
      <Animated.Text style={[styles.letterI, { 
        opacity: fadeI,
        color: '#FECA57', // Golden yellow
        transform: [{ rotate: '-15deg' }]
      }]}>I</Animated.Text>
      
      <Animated.Text style={[styles.letterS2, { 
        opacity: fadeS2,
        color: '#FF9FF3', // Pink
        transform: [{ rotate: '10deg' }]
      }]}>S</Animated.Text>
      

      {/* Main tagline */}
      <Animated.View style={[styles.taglineContainer, { opacity: fadeTagline }]}>
        <Text style={styles.tagline}>All-in-One • Creative • Modern</Text>
      </Animated.View>

      {/* Artistic dots scattered around */}
      <View style={[styles.dot, styles.dot1]} />
      <View style={[styles.dot, styles.dot2]} />
      <View style={[styles.dot, styles.dot3]} />
      <View style={[styles.dot, styles.dot4]} />
      <View style={[styles.dot, styles.dot5]} />

      {/* Subtle loading indicator */}
      <Animated.View style={[styles.loadingDot, { opacity: fadeMain }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e', // Dark navy background
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Artistic background shapes
  artShape1: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(255, 107, 107, 0.1)', // Very transparent coral
    top: height * 0.1,
    right: -width * 0.2,
  },
  artShape2: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: 20,
    backgroundColor: 'rgba(78, 205, 196, 0.08)', // Very transparent turquoise
    bottom: height * 0.1,
    left: -width * 0.1,
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoWrapper: {
    padding: 15,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  // Scattered letters (EDUSIS)
  letterE: {
    position: 'absolute',
    fontSize: 60,
    fontWeight: '900',
    top: height * 0.2,
    left: width * 0.15,
  },
  letterD: {
    position: 'absolute',
    fontSize: 55,
    fontWeight: '900',
    top: height * 0.15,
    right: width * 0.25,
  },
  letterU: {
    position: 'absolute',
    fontSize: 65,
    fontWeight: '900',
    top: height * 0.35,
    left: width * 0.08,
  },
  letterS1: {
    position: 'absolute',
    fontSize: 50,
    fontWeight: '900',
    bottom: height * 0.35,
    right: width * 0.15,
  },
  letterI: {
    position: 'absolute',
    fontSize: 58,
    fontWeight: '900',
    bottom: height * 0.25,
    left: width * 0.2,
  },
  letterS2: {
    position: 'absolute',
    fontSize: 62,
    fontWeight: '900',
    bottom: height * 0.15,
    right: width * 0.08,
  },

  // Artistic decorative texts
  artText1: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: '600',
    top: height * 0.25,
    left: width * 0.45,
    transform: [{ rotate: '-5deg' }],
  },
  artText2: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: '500',
    top: height * 0.45,
    right: width * 0.35,
    transform: [{ rotate: '8deg' }],
  },
  artText3: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: '400',
    bottom: height * 0.45,
    left: width * 0.4,
    transform: [{ rotate: '12deg' }],
  },
  artText4: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: '700',
    top: height * 0.38,
    right: width * 0.1,
    transform: [{ rotate: '-8deg' }],
  },

  // Main tagline
  taglineContainer: {
    position: 'absolute',
    bottom: height * 0.12,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1,
  },

  // Artistic dots
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dot1: {
    backgroundColor: '#FF6B6B',
    top: height * 0.3,
    right: width * 0.4,
  },
  dot2: {
    backgroundColor: '#4ECDC4',
    bottom: height * 0.4,
    left: width * 0.3,
  },
  dot3: {
    backgroundColor: '#45B7D1',
    top: height * 0.4,
    left: width * 0.6,
  },
  dot4: {
    backgroundColor: '#FECA57',
    bottom: height * 0.3,
    right: width * 0.5,
  },
  dot5: {
    backgroundColor: '#FF9FF3',
    top: height * 0.5,
    right: width * 0.2,
  },

  // Loading indicator
  loadingDot: {
    position: 'absolute',
    bottom: height * 0.05,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});

export default SplashScreen;
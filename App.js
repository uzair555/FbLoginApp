import React, {useState} from 'react';

import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

const App = () => {
  const dummyData = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
    'Item 15',
    'Item 17',
  ];
  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Max_Height = 150; //max heaigt of the header
  const Header_Min_Height = 50; //min heaigt of the header

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ['blue', 'red'],
    extrapolate: 'clamp',
  });

  const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: animatedHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
          },
        ]}>
        <Text style={styles.headerText}>
          React-native Collapseable Toolbar with animation
        </Text>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
          {useNativeDriver: false},
        )}>
        {dummyData.map((item, index) => {
          return (
            <Text style={styles.textStyle} key={index}>
              {item}
            </Text>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    padding: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;

// const App = () => {
//   const [userInfo, setUserInfo] = useState();

//   logoutWithFacebook = () => {
//     LoginManager.logOut();
//     setUserInfo({userInfo: {}});
//   };

//   getInfoFromToken = token => {
//     const PROFILE_REQUEST_PARAMS = {
//       fields: {
//         string: 'id,name,first_name,last_name',
//       },
//     };
//     const profileRequest = new GraphRequest(
//       '/me',
//       {token, parameters: PROFILE_REQUEST_PARAMS},
//       (error, user) => {
//         if (error) {
//           console.log('login info has error: ' + error);
//         } else {
//           setUserInfo({userInfo: user});
//           console.log('result:', user);
//         }
//       },
//     );
//     new GraphRequestManager().addRequest(profileRequest).start();
//   };

//   loginWithFacebook = () => {
//     // Attempt a login using the Facebook login dialog asking for default permissions.
//     LoginManager.logInWithPermissions(['public_profile']).then(
//       login => {
//         if (login.isCancelled) {
//           console.log('Login cancelled');
//         } else {
//           AccessToken.getCurrentAccessToken().then(data => {
//             const accessToken = data.accessToken.toString();
//             getInfoFromToken(accessToken);
//           });
//         }
//       },
//       error => {
//         console.log('Login fail with error: ' + error);
//       },
//     );
//   };

//   console.log(userInfo?.userInfo.name, '====Userssss');

//   return (
//     <View
//       style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignContent: 'center',
//       }}>
//       <TouchableOpacity
//         onPress={() => {
//           userInfo ? logoutWithFacebook() : loginWithFacebook();
//         }}
//         style={{marginTop: 20, backgroundColor: 'blue', borderRadius: 12}}>
//         <Text style={{color: 'white', padding: 10}}>
//           {userInfo ? 'Logout With Facebook' : 'Login From Facebook'}
//         </Text>
//       </TouchableOpacity>

//       {userInfo?.userInfo?.name && (
//         <Text style={{fontSize: 16, marginVertical: 16}}>
//           Logged in As {userInfo?.userInfo?.name}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

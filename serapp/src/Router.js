import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Appearance, StatusBar } from 'react-native';

["Auth Screen İmports"]
import Login from '../src/Auth-Screen-Folder/screens/login_screen';
import Register from '../src/Auth-Screen-Folder/screens/register_screen';
import Deneme from './Auth-Screen-Folder/screens/deneme';

["Main Screen İmports"]
import Main from '../src/Main-Screen-Folder/screens/main_screen'
import FlashMessage from 'react-native-flash-message';


const Stack = createStackNavigator();
const theme = Appearance.getColorScheme();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }}>
          <Stack.Screen name='deneme' component={Deneme} />
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='register' component={Register} />
          <Stack.Screen name='main' component={Main} />
        </Stack.Navigator>
        <StatusBar barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme == 'dark' ? '#000' : '#fff'} />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
}
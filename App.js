import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from './screens/HomeScreen';
import EnterBookScreen from './screens/EnterBookScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false // hide default header on all screens
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EnterBook" component={EnterBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
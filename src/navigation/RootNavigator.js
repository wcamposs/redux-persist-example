// libraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// screens
import BooksList from '../screens/BooksList';
import BookmarksList from '../screens/BookmarksList';

const Tab = createBottomTabNavigator();
  
const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'BooksList':
      iconName = 'view-dashboard';
      tabBarShowLabel = false;
      break;
    case 'BookmarksList':
      iconName = 'bookmark-multiple-outline';
      tabBarShowLabel = false;
      break;
    default:
      break;
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
};
  

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='BooksList'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarStyle: { backgroundColor: '#1E1B26', display: "flex", },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarShowLabel: false,
          // tabBarInactiveTintColor: "#2D3038",
          headerShown: false,
        })}
      >
        <Tab.Screen name='BooksList' component={BooksList} />
        <Tab.Screen name='BookmarksList' component={BookmarksList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
  
export default RootNavigator;
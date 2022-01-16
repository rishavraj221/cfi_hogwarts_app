import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "../assets/Icons";
import HomeScreen from "../screens/Home";
import GameScreen from "../screens/Game";
import ProfileScreen from "../screens/Profile";

import routes from "./routes";

const Tab = createBottomTabNavigator();

const AppNavigation = ({ boardConnection }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === routes.HOME) iconName = "home";
          else if (route.name === routes.GAME) iconName = "game";
          else if (route.name === routes.PROFILE) iconName = "profile";

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={size}
              color={focused ? "#595959" : "#969696"}
            />
          );
        },
        tabBarActiveTintColor: "#595959",
        tabBarInactiveTintColor: "#969696",
        tabBarLabel:
          route.name.substring(0, 1) +
          route.name.substring(1, route.name.length).toLowerCase(),
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name={routes.HOME}
        children={() => <HomeScreen boardConnection={boardConnection} />}
      />
      <Tab.Screen
        name={routes.GAME}
        children={() => <GameScreen boardConnection={boardConnection} />}
      />
      <Tab.Screen name={routes.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigation;

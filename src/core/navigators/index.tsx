import {createDrawerNavigator} from '@react-navigation/drawer';
import CategoryScreen from '../../screens/Category';
import DesktopScreen from '../../screens/Desktop';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useStoreState} from '../store';
import CategoryDetailsScreen from '../../screens/CategoryDetails';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const categories = useStoreState(state => state.category.categories);
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Desktop" component={DesktopScreen} />

      {/* TODO: validate duplicates */}
      {categories
        .filter(category => !!category.name)
        .map((category, index) => (
          <Drawer.Screen
            name={category.name}
            component={CategoryDetailsScreen}
            key={index}
            initialParams={{id: category.id}}
          />
        ))}

      <Drawer.Screen name="Manage Category" component={CategoryScreen} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => (
  <>
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  </>
);

export default AppNavigator;

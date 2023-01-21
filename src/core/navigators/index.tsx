import {createDrawerNavigator} from '@react-navigation/drawer';
import Category from '../../screens/Category';
import Desktop from '../../screens/Desktop';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useStoreState} from '../store/category/hooks';
import {Todo} from '../store/category/model';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const todos = useStoreState(state => state.category.todos);
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Desktop" component={Desktop} />

      {/* TODO: validate duplicates */}
      {todos.map((todo: Todo, index) => (
        <Drawer.Screen name={todo.text} component={Category} key={index} />
      ))}

      <Drawer.Screen name="Manage Category" component={Category} />
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

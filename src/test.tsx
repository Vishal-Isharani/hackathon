import {Button, Text, View} from 'react-native-ui-lib';
import React from 'react';
import {useStoreActions, useStoreState} from './core/store/category/hooks';

export const Test = () => {
  const todos = useStoreState(state => state.category.todos);
  const add = useStoreActions(state => state.category.addTodo);
  return (
    <View>
      <Text>{todos.length}</Text>
      <Button
        text70
        white
        background-orange30
        label="Login"
        onPress={() => add({done: false, text: 'Vishal'})}
      />
    </View>
  );
};

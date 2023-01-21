import * as React from 'react';
import {Button, Text, View} from 'react-native-ui-lib';
import {useStoreActions} from '../../core/store/category/hooks';

type Props = {};
const Desktop = (props: Props) => {
  const add = useStoreActions(state => state.category.addTodo);
  return (
    <View>
      <Text>Hello from the desktop</Text>

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
export default Desktop;

import * as React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useStoreState} from '../../core/store';

const DesktopScreen = () => {
  const categories = useStoreState(state => state.category.categories);
  return (
    <View padding-20>
      {categories.map(category => (
        <View key={category.id}>
          <Text>{category.name}</Text>
        </View>
      ))}
      <Text>Hello from the desktop</Text>
    </View>
  );
};
export default DesktopScreen;

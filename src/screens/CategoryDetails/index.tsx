import * as React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useStoreState} from '../../core/store';
import {useRoute} from '@react-navigation/native';

const CategoryDetailsScreen = () => {
  const route = useRoute();
  const params = route.params as {id?: string};
  console.log(params);
  const category = useStoreState(state =>
    state.category.categoryDetails(params.id || ''),
  );

  return (
    <View padding-20>
      {category !== undefined && (
        <View key={category.id}>
          <Text>{category.name}</Text>
        </View>
      )}
    </View>
  );
};
export default CategoryDetailsScreen;

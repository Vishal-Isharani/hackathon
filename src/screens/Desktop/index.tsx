import * as React from 'react';
import {Card, Colors, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {useStoreActions, useStoreState} from '../../core/store';
import {CategoryItem} from '../../shared/models';
import {useFieldArray, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {AddItemComponent} from '../../core/components';
import Icon from 'react-native-vector-icons/AntDesign';

const DesktopScreen = () => {
  const categories = useStoreState(state => state.category.categories);

  const {control, watch} = useForm({});
  const {} = useFieldArray({
    control,
    name: 'attributes',
  });

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch(value => console.log(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const addCategoryItem = useStoreActions(
    actions => actions.category.addCategoryItem,
  );
  const removeCategoryItem = useStoreActions(
    actions => actions.category.removeCategoryItem,
  );

  return (
    <ScrollView padding-20>
      {categories.map(category => (
        <View key={category.id}>
          {/* title */}
          <View margin-10 paddingB-5 br10 flex>
            <View row paddingT-10 paddingH-5 spread>
              <Text text50>{category.name}</Text>
              <TouchableOpacity
                centerV
                onPress={() =>
                  addCategoryItem({
                    categoryId: category.id,
                    item: new CategoryItem(),
                  })
                }>
                <Icon name={'plus'} size={20} color={Colors.$textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {category.items.map(item => (
              <AddItemComponent
                categoryId={category.id}
                item={item}
                attributes={category.attributes}
                removeCategoryItem={(categoryId: string, itemId: string) => {
                  removeCategoryItem({
                    categoryId: categoryId,
                    itemId: itemId,
                  });
                }}
                control={control}
              />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
export default DesktopScreen;

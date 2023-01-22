import * as React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useStoreActions, useStoreState} from '../../core/store';
import {CategoryItem} from '../../shared/models';
import {useFieldArray, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {CategoryCard} from '../../core/components';
import AddItemComponent from '../../core/components/AddItemComponent';

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
          <View>
            <CategoryCard
              category={category}
              onAddItemPress={(id: string) =>
                addCategoryItem({
                  categoryId: id,
                  item: new CategoryItem(),
                })
              }
            />
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
      <Text>Hello from the desktop</Text>
    </ScrollView>
  );
};
export default DesktopScreen;

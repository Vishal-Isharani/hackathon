import * as React from 'react';
import {useStoreActions, useStoreState} from '../../core/store';
import {CategoryItem} from '../../shared/models';
import {useFieldArray, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {CategoryItemComponent} from '../../core/components';

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
        <CategoryItemComponent
          key={category.id}
          category={category}
          control={control}
          addCategoryItem={(categoryId: string, item: CategoryItem) =>
            addCategoryItem({
              categoryId: categoryId,
              item,
            })
          }
          removeCategoryItem={(categoryId: string, itemId: string) =>
            removeCategoryItem({
              categoryId: categoryId,
              itemId: itemId,
            })
          }
        />
      ))}
    </ScrollView>
  );
};
export default DesktopScreen;

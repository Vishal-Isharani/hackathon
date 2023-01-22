import * as React from 'react';
import {useStoreActions, useStoreState} from '../../core/store';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {CategoryItem} from '../../shared/models';
import {CategoryItemComponent, NotFoundComponent} from '../../core/components';
import {useFieldArray, useForm} from 'react-hook-form';

const CategoryDetailsScreen = () => {
  const route = useRoute();
  const params = route.params as {id?: string};

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

  const category = useStoreState(state =>
    state.category.categoryDetails(params.id || ''),
  );

  return (
    <ScrollView padding-20>
      {!category && <NotFoundComponent message="Category details not found" />}

      {category && (
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
      )}
    </ScrollView>
  );
};
export default CategoryDetailsScreen;

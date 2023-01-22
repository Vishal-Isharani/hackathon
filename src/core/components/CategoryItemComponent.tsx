import {Category, CategoryItem} from '../../shared/models';
import {Colors, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/AntDesign';
import {AddItemComponent} from './AddItemComponent';
import * as React from 'react';

type Props = {
  category: Category;
  control: any;
  addCategoryItem: (categoryId: string, item: CategoryItem) => void;
  removeCategoryItem: (categoryId: string, itemId: string) => void;
};

export const CategoryItemComponent = ({
  category,
  addCategoryItem,
  removeCategoryItem,
  control,
}: Props) => {
  return (
    <View>
      {/* title */}
      <View margin-10 paddingB-5 br10 flex>
        <View row paddingT-10 paddingH-5 spread>
          <Text text50>{category.name}</Text>
          <TouchableOpacity
            centerV
            onPress={() => addCategoryItem(category.id, new CategoryItem())}>
            <Icon name={'plus'} size={20} color={Colors.$textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {category.items.map(item => (
          <AddItemComponent
            key={item.id}
            categoryId={category.id}
            item={item}
            attributes={category.attributes}
            titleAttribute={category.titleAttribute}
            removeCategoryItem={(categoryId: string, itemId: string) => {
              removeCategoryItem(categoryId, itemId);
            }}
            control={control}
          />
        ))}
      </View>
    </View>
  );
};

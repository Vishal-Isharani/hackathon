import * as React from 'react';
import {
  Button,
  Checkbox,
  DateTimePicker,
  Text,
  View,
} from 'react-native-ui-lib';
import {TextField} from 'react-native-ui-lib/src/incubator';
import {useStoreActions, useStoreState} from '../../core/store';
import {
  CategoryAttribute,
  CategoryItem,
  ControlType,
} from '../../shared/models';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {CategoryCard} from '../../core/components';

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

  const renderText = (attribute: CategoryAttribute, field: any) => {
    return (
      <TextField
        placeholder={attribute.name}
        keyboardType={
          attribute.type === ControlType.Number ? 'numeric' : 'default'
        }
        floatingPlaceholder
        migrate
        value={field.value}
        onChange={(text: string) => field.onChange(text)}
        enableErrors
        validate={['required', (value: string) => value.length > 6]}
        validationMessage={['Field is required']}
        maxLength={30}
      />
    );
  };

  const renderDate = (attribute: CategoryAttribute, field: any) => {
    return (
      <DateTimePicker
        title={attribute.name}
        placeholder={attribute.name}
        mode={'date'}
        onChange={(date: Date) => field.onChange(date)}
      />
    );
  };

  const renderCheckbox = (attribute: CategoryAttribute, field: any) => {
    return (
      <Checkbox
        value={field.value}
        onValueChange={() => field.onChange(!field.value)}
        label={attribute.name}
      />
    );
  };

  const renderControl = (attribute: CategoryAttribute) => {
    return (
      <Controller
        control={control}
        name={`attributes.${attribute.id}.${attribute.name}`}
        render={({field}) => {
          switch (attribute.type) {
            case ControlType.Text:
              return renderText(attribute, field);
            case ControlType.Date:
              return renderDate(attribute, field);
            case ControlType.Checkbox:
              return renderCheckbox(attribute, field);
            case ControlType.Number:
              return renderText(attribute, field);
          }
        }}
      />
    );
  };

  return (
    <ScrollView padding-20>
      {categories.map(category => (
        <View key={category.id}>
          {/* title */}
          <View>
            <CategoryCard category={category} />
            <Button
              label="Add Item"
              onPress={() => {
                addCategoryItem({
                  categoryId: category.id,
                  item: new CategoryItem(),
                });
              }}
            />
          </View>

          <View>
            {category.items.map(item => (
              <View key={item.id}>
                {category.attributes.map(attribute => (
                  <View key={attribute.id}>{renderControl(attribute)}</View>
                ))}
                <Button
                  onPress={() =>
                    removeCategoryItem({
                      categoryId: category.id,
                      itemId: item.id,
                    })
                  }
                  label="Remove"
                />
              </View>
            ))}
          </View>
        </View>
      ))}
      <Text>Hello from the desktop</Text>
    </ScrollView>
  );
};
export default DesktopScreen;

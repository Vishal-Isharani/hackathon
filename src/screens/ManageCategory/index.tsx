import * as React from 'react';
import {useCallback, useState} from 'react';
import {
  Button,
  ButtonSize,
  Card,
  Dialog,
  ListItem,
  PanningProvider,
  Text,
  View,
} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useStoreActions, useStoreState} from '../../core/store';
import {Category, CategoryAttribute} from '../../shared/models';
import {
  AddAttributeComponent,
  CategoryCardComponent,
  InputComponent,
  NotFoundComponent,
} from '../../core/components';
import {useNavigation} from '@react-navigation/native';

const initialFormStat = () => new Category();

const ManageCategoryScreen = () => {
  const {
    control,
    watch,
    getValues,
    resetField,
    reset,
    getFieldState,
    setValue,
    setError,
  } = useForm({
    defaultValues: initialFormStat(),
    reValidateMode: 'onChange',
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'attributes',
    keyName: 'id',
  });

  const navigation = useNavigation();
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showTitleChangePicker, setShowTitleChangePicker] = useState(false);

  const categories = useStoreState(state => state.category.categories);

  const updateCategory = useStoreActions(
    actions => actions.category.updateCategory,
  );
  const removeCategory = useStoreActions(
    actions => actions.category.removeCategory,
  );

  const toggleShowCategoryForm = useCallback(() => {
    reset(initialFormStat());
    setShowNewCategoryForm(!showNewCategoryForm);
  }, [reset, showNewCategoryForm]);

  React.useEffect(() => {
    return navigation.addListener('blur', () => {
      setShowNewCategoryForm(!showNewCategoryForm);
    });
  }, [navigation, showNewCategoryForm, toggleShowCategoryForm]);

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch(value => {
      if (!value.name || !value.name.length) {
        return;
      }
      const isDuplicateName = categories.some(category => {
        return (
          category.id !== value.id &&
          category.name.toLowerCase() === value.name?.toLowerCase()
        );
      });
      if (isDuplicateName) {
        setError('name', {message: 'Duplicate category name'});
        return;
      }
      updateCategory(value as Category);
    });
    return () => subscription.unsubscribe();
  }, [categories, getFieldState, setError, updateCategory, watch]);

  const addNewField = () => {
    append(new CategoryAttribute());
  };

  const removeField = (index: number) => {
    resetField(`attributes.${index}`);
    remove(index);
  };

  return (
    <View flex>
      <ScrollView>
        {!categories.length && (
          <NotFoundComponent message="No categories found" />
        )}

        {categories.map(category => (
          <View key={category.id}>
            <CategoryCardComponent
              control={control}
              categoryField={category}
              category={category}
              removeField={ind => removeField(ind)}
            />
          </View>
        ))}

        {showNewCategoryForm && (
          <Card margin-10 paddingB-5 br10 flex>
            <View padding-10>
              <Controller
                control={control}
                name={'name'}
                rules={{required: true, maxLength: 3}}
                render={({field, fieldState}) => (
                  <InputComponent
                    value={field.value}
                    onChange={(text: string) => field.onChange(text)}
                    validationMessage={fieldState.error?.message}
                  />
                )}
              />

              {fields.map((categoryField, index) => (
                <AddAttributeComponent
                  key={categoryField.id}
                  id={categoryField.id}
                  control={control}
                  index={index}
                  removeField={ind => removeField(ind)}
                />
              ))}

              <View marginB-10>
                {
                  <Dialog
                    useSafeArea={true}
                    overlayBackgroundColor={'#ffffff'}
                    visible={showTitleChangePicker}
                    onDismiss={() => console.log('dismissed')}
                    panDirection={PanningProvider.Directions.DOWN}>
                    {getValues().attributes.map(attr => (
                      <ListItem
                        key={attr.id}
                        onPress={() => setValue('titleAttribute', attr.name)}>
                        <Text grey10 text80 marginL-10>
                          {attr.name}
                        </Text>
                      </ListItem>
                    ))}
                  </Dialog>
                }

                <Button
                  disabled={!getValues().attributes.length}
                  size={ButtonSize.small}
                  onPress={() => {
                    setShowTitleChangePicker(!showTitleChangePicker);
                  }}
                  label={'TITLE FIELD'}
                />
              </View>

              <View spread row>
                <Button
                  disabled={!getValues().name.length}
                  size={ButtonSize.small}
                  label="Add new field"
                  onPress={() => {
                    addNewField();
                  }}
                />
                <Button
                  left
                  size={ButtonSize.small}
                  onPress={() => {
                    const cat = getValues();
                    removeCategory(cat.id as string);
                    toggleShowCategoryForm();
                  }}
                  label="Remove"
                />
              </View>
            </View>
          </Card>
        )}
      </ScrollView>

      <View bottom margin-10>
        <Button label="Add New Category" onPress={toggleShowCategoryForm} />
      </View>
    </View>
  );
};
export default ManageCategoryScreen;

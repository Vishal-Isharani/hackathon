import * as React from 'react';
import {useRef, useState} from 'react';
import {Button, ButtonSize, Card, Picker, View} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {useStoreActions, useStoreState} from '../../core/store';
import {Category, CategoryAttribute} from '../../shared/models';
import {Picker as CustomPicker} from '@react-native-picker/picker';
import {
  AddAttributeComponent,
  CategoryCardComponent,
  InputComponent,
  NotFoundComponent,
} from '../../core/components';

const initialFormStat = () => new Category();

const ManageCategoryScreen = () => {
  const {control, watch, getValues, resetField, reset, getFieldState} = useForm(
    {
      defaultValues: initialFormStat(),
      reValidateMode: 'onChange',
    },
  );
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'attributes',
    keyName: 'id',
  });

  const pickerRef = useRef();

  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showTitleChangePicker, setShowTitleChangePicker] = useState(false);

  const categories = useStoreState(state => state.category.categories);

  const updateCategory = useStoreActions(
    actions => actions.category.updateCategory,
  );
  const removeCategory = useStoreActions(
    actions => actions.category.removeCategory,
  );

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch(value => {
      value.name && value.name.length ? updateCategory(value as Category) : {};
    });
    return () => subscription.unsubscribe();
  }, [getFieldState, updateCategory, watch]);

  const addNewField = () => {
    append(new CategoryAttribute());
  };

  const removeField = (index: number) => {
    resetField(`attributes.${index}`);
    remove(index);
  };

  const toggleShowCategoryForm = () => {
    reset(initialFormStat());
    setShowNewCategoryForm(!showNewCategoryForm);
  };

  return (
    <View flex>
      <ScrollView>
        {!categories.length && (
          <NotFoundComponent message="No categories found" />
        )}

        {categories.map(category => (
          <View key={category.id}>
            <CategoryCardComponent category={category} />
          </View>
        ))}

        {showNewCategoryForm && (
          <Card margin-10 paddingB-5 br10 flex>
            <View padding-10>
              <Controller
                control={control}
                name={'name'}
                rules={{required: true, maxLength: 3}}
                render={({field}) => (
                  <InputComponent
                    value={field.value}
                    onChange={(text: string) => field.onChange(text)}
                  />
                )}
              />

              {fields.map((categoryField, index) => (
                <AddAttributeComponent
                  key={categoryField.id}
                  categoryField={categoryField}
                  control={control}
                  index={index}
                  removeField={ind => removeField(ind)}
                />
              ))}

              <View marginB-10>
                {showTitleChangePicker && (
                  /* @ts-ignore */
                  <Controller
                    control={control}
                    name={'titleAttribute'}
                    render={({field}) => {
                      return (
                        /* @ts-ignore */
                        <CustomPicker
                          /* @ts-ignore */
                          ref={pickerRef}
                          value={field.value}
                          onValueChange={({value}: {value: string}) => {
                            field.onChange(value);
                          }}>
                          {getValues()?.attributes?.map(option => (
                            <Picker.Item
                              key={option.id}
                              value={option.name}
                              label={option.name}
                            />
                          ))}
                        </CustomPicker>
                      );
                    }}
                  />
                )}

                <Button
                  size={ButtonSize.small}
                  onPress={() => {
                    console.log(pickerRef.current);
                    setShowTitleChangePicker(!showTitleChangePicker);
                  }}
                  label={'TITLE FIELD'}
                />
              </View>

              <View spread row>
                <Button
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

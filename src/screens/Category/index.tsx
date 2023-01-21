import * as React from 'react';
import {useRef, useState} from 'react';
import {Button, Colors, Picker, TextField, View} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import {useStoreActions} from '../../core/store';
import {Category, CategoryAttribute, ControlType} from '../../shared/models';
import {Picker as CustomPicker} from '@react-native-picker/picker';

const dropdownIcon = <Icon name="down" color={Colors.$iconDefault} />;

const initialFormStat = () => new Category();

const CategoryScreen = () => {
  const {control, watch, getValues} = useForm({
    defaultValues: initialFormStat(),
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'attributes',
    keyName: 'id',
  });

  const pickerRef = useRef();
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showTitleChangePicker, setShowTitleChangePicker] = useState(false);
  const updateCategory = useStoreActions(
    actions => actions.category.updateCategory,
  );
  const removeCategory = useStoreActions(
    actions => actions.category.removeCategory,
  );

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = watch(value => updateCategory(value as Category));
    return () => subscription.unsubscribe();
  }, [updateCategory, watch]);

  const addNewField = () => {
    append(new CategoryAttribute());
  };

  const removeField = (index: number) => {
    remove(index);
  };

  const toggleShowCategoryForm = () => {
    setShowNewCategoryForm(!showNewCategoryForm);
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View flex>
        {showNewCategoryForm && (
          <View padding-20>
            <Controller
              control={control}
              name={'name'}
              render={({field}) => (
                <TextField
                  placeholder={'Name'}
                  floatingPlaceholder
                  migrate
                  value={field.value}
                  onChangeText={(text: string) => field.onChange(text)}
                  enableErrors
                  validate={['required', (value: string) => value.length > 6]}
                  validationMessage={['Field is required']}
                  maxLength={30}
                />
              )}
            />

            {/* TODO: extract it to a component */}
            {fields.map((categoryField, index) => (
              <View row key={categoryField.id}>
                <Controller
                  control={control}
                  name={`attributes.${index}.name`}
                  render={({field}) => (
                    <TextField
                      value={field.value}
                      placeholder={'Field Name'}
                      floatingPlaceholder
                      migrate
                      onChangeText={(text: string) => field.onChange(text)}
                      enableErrors
                      validate={[
                        'required',
                        (value: string) => value.length > 6,
                      ]}
                      validationMessage={['Field is required']}
                      maxLength={30}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`attributes.${index}.type`}
                  render={({field}) => {
                    return (
                      /* @ts-ignore */
                      <Picker
                        value={field.value}
                        onChange={({value}: {value: string}) => {
                          field.onChange(value);
                        }}
                        mode={Picker.modes.SINGLE}
                        selectionLimit={3}
                        trailingAccessory={dropdownIcon}
                        migrateTextField>
                        {Object.keys(ControlType).map(key => (
                          <Picker.Item key={key} value={key} label={key} />
                        ))}
                      </Picker>
                    );
                  }}
                />

                <Button onPress={() => removeField(index)} label={'Delete'} />
              </View>
            ))}

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
              onPress={() => {
                console.log(pickerRef.current);
                setShowTitleChangePicker(!showTitleChangePicker);
              }}
              label={'TITLE FIELD'}
            />

            <View row>
              <Button
                label="Add new field"
                onPress={() => {
                  addNewField();
                }}
              />
              <Button
                onPress={() => {
                  const cat = getValues();
                  removeCategory(cat.id as string);
                  toggleShowCategoryForm();
                }}
                label="Remove"
              />
            </View>
          </View>
        )}
        <View flex bottom>
          <Button label="Add New Category" onPress={toggleShowCategoryForm} />
        </View>
      </View>
    </ScrollView>
  );
};
export default CategoryScreen;

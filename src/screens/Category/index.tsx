import * as React from 'react';
import {Button, Colors, Picker, TextField, View} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {useState} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/AntDesign';
import {useStoreActions} from '../../core/store';
import {Category} from '../../core/store/categoryListModel';
import {ControlType} from '../../shared/models';

const options = [
  {label: 'Date', value: 'date'},
  {label: 'Text', value: 'text'},
  {label: 'Checkbox', value: 'checkbox'},
  {label: 'Number', value: 'number'},
];
const dropdownIcon = <Icon name="down" color={Colors.$iconDefault} />;

const initialFormStat = () => ({
  name: '',
  id: uuid.v4(),
  fields: [
    {
      id: uuid.v4(),
      name: '',
      type: '',
    },
  ],
});

const CategoryScreen = () => {
  const {control, watch, getValues} = useForm({
    defaultValues: initialFormStat(),
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'fields',
    keyName: 'id',
  });

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
    append({
      id: '',
      name: '',
      type: ControlType.Text,
    });
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
                  onChangeText={(text: string) => {
                    field.onChange(text);
                  }}
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
                  name={`fields.${index}.name`}
                  render={({field}) => (
                    <TextField
                      value={field.value}
                      placeholder={'Field Name'}
                      floatingPlaceholder
                      migrate
                      onChangeText={() => {}}
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
                  name={`fields.${index}.type`}
                  render={({field}) => {
                    return (
                      /* @ts-ignore */
                      <Picker
                        value={field.value}
                        onChange={(value: string) => {
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
              <Picker
                value={''}
                onChange={(value: string) => {
                  console.log(value);
                }}
                mode={Picker.modes.SINGLE}
                selectionLimit={3}
                trailingAccessory={dropdownIcon}
                migrateTextField>
                {options.map(option => (
                  <Picker.Item
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </Picker>
            )}

            <Button
              onPress={() => setShowTitleChangePicker(!showTitleChangePicker)}
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

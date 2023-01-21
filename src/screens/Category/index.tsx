import * as React from 'react';
import {
  Button,
  Colors,
  Icon,
  Picker,
  TextField,
  View,
} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {useState} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import uuid from 'react-native-uuid';

const options = [
  {label: 'Date', value: 'date'},
  {label: 'Text', value: 'text'},
  {label: 'Checkbox', value: 'checkbox'},
  {label: 'Number', value: 'number'},
];
const dropdown = require('../../assets/icons/chevronDown.png');
const dropdownIcon = <Icon source={dropdown} tintColor={Colors.$iconDefault} />;

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

type Props = {};
const Category = (props: Props) => {
  const {control} = useForm({
    defaultValues: initialFormStat(),
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'fields',
    keyName: 'id',
  });
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [showTitleChangePicker, setShowTitleChangePicker] = useState(false);

  const addNewField = () => {
    append({
      id: '',
      name: '',
      type: 'text',
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
          <View padding-20 flex>
            <Controller
              control={control}
              name={`name`}
              render={({field}) => (
                <TextField
                  placeholder={'Placeholder'}
                  floatingPlaceholder
                  migrate
                  value={field.value}
                  onChangeText={(text: string) => {
                    field.onChange(text);
                  }}
                  enableErrors
                  validate={[
                    'required',
                    'email',
                    (value: string) => value.length > 6,
                  ]}
                  validationMessage={[
                    'Field is required',
                    'Email is invalid',
                    'Password is too short',
                  ]}
                  maxLength={30}
                />
              )}
            />

            {/* TODO: extract it to a component */}
            {fields.map((categoryField, index) => (
              <View flex row>
                <Controller
                  control={control}
                  name={`fields.${index}.name`}
                  render={({field}) => (
                    <TextField
                      value={field.value}
                      placeholder={'Placeholder'}
                      floatingPlaceholder
                      migrate
                      onChangeText={() => {}}
                      enableErrors
                      validate={[
                        'required',
                        'email',
                        (value: string) => value.length > 6,
                      ]}
                      validationMessage={[
                        'Field is required',
                        'Email is invalid',
                        'Password is too short',
                      ]}
                      maxLength={30}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`fields.${index}.name`}
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
                        {options.map(option => (
                          <Picker.Item
                            key={option.value}
                            value={option.value}
                            label={option.label}
                          />
                        ))}
                      </Picker>
                    );
                  }}
                />

                <Button
                  onPress={() => removeField(index)}
                  label={'Delete'}></Button>
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

            <View flex row>
              <Button
                label="Add new field"
                onPress={() => {
                  addNewField();
                }}></Button>
              <Button label="Remove"></Button>
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
export default Category;

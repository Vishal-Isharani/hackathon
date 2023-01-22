import {Category, ControlType} from '../../shared/models';
import * as React from 'react';
import {Control} from 'react-hook-form/dist/types';
import {Colors, Picker, View} from 'react-native-ui-lib';
import {Controller} from 'react-hook-form';
import {InputComponent} from './Input';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  categoryField: any;
  control: Control<Category>;
  index: number;
  removeField: (index: number) => void;
};

const dropdownIcon = <Icon name="down" color={Colors.$iconDefault} />;
export const AddAttributeComponent = ({
  categoryField,
  control,
  index,
  removeField,
}: Props) => {
  return (
    <View
      key={categoryField.id}
      row
      br20
      marginB-10
      paddingH-5
      paddingV-5
      spread
      style={{
        borderWidth: 0.5,
      }}>
      <View width={'50%'}>
        <Controller
          control={control}
          name={`attributes.${index}.name`}
          render={({field}) => (
            <InputComponent
              value={field.value}
              onChange={(text: string) => field.onChange(text)}
            />
          )}
        />
      </View>

      <View centerV marginT-18>
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
      </View>

      <View centerV>
        <Icon size={20} name="delete" onPress={() => removeField(index)}></Icon>
      </View>
    </View>
  );
};

import {Category, ControlType} from '../../shared/models';
import React from 'react';
import {
  Card,
  Colors,
  Picker,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import {TextField} from 'react-native-ui-lib/src/incubator';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  category: Category;
  onAddItemPress: (id: string) => void;
};

const dropdownIcon = <Icon name="down" color={Colors.$iconDefault} />;
export const CategoryCard = ({category, onAddItemPress}: Props) => {
  return (
    <Card margin-10 paddingB-5 br10 flex>
      <View padding-10>
        <View row paddingT-10 paddingH-5 spread>
          <Text>{category.name}</Text>
          <TouchableOpacity centerV onPress={() => onAddItemPress(category.id)}>
            <Icon name={'plus'} size={20} color={Colors.$textPrimary} />
          </TouchableOpacity>
        </View>

        <View
          br20
          marginV-10
          paddingH-5
          style={{
            borderWidth: 0.5,
          }}>
          <TextField
            placeholder={category.name}
            floatingPlaceholder
            value={category.name}
            onChangeText={() => {}}
            disabled
            text80
          />
        </View>

        {category.attributes.map(attribute => (
          <View
            key={attribute.id}
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
              <TextField
                placeholder={attribute.name}
                floatingPlaceholder
                value={attribute.name}
                onChangeText={() => {}}
                disabled
                migrateTextField
              />
            </View>

            <View centerV marginT-18>
              <Picker
                value={attribute.name}
                onChange={() => {}}
                mode={Picker.modes.SINGLE}
                selectionLimit={3}
                trailingAccessory={dropdownIcon}
                migrateTextField>
                {Object.keys(ControlType).map(key => (
                  <Picker.Item key={key} value={key} label={key} />
                ))}
              </Picker>
            </View>
            <View centerV>
              <Icon size={20} name="delete" onPress={() => {}}></Icon>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};

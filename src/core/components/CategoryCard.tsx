import {Category, ControlType} from '../../shared/models';
import React from 'react';
import {Button, Card, Colors, Picker, View} from 'react-native-ui-lib';
import {TextField} from 'react-native-ui-lib/src/incubator';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  category: Category;
};

const dropdownIcon = <Icon name="down" color={Colors.$iconDefault} />;
export const CategoryCard = ({category}: Props) => {
  return (
    <Card margin-10 paddingB-5 br10 flex>
      <Card.Section
        content={[{text: category.name, text70: true, grey10: true}]}
        contentStyle={{alignItems: 'center'}}
      />

      <View margin-10 br10>
        <TextField
          placeholder={category.name}
          floatingPlaceholder
          value={category.name}
          onChangeText={() => {}}
          disabled
        />
      </View>

      {category.attributes.map(attribute => (
        <View key={attribute.id} row>
          <TextField
            placeholder={attribute.name}
            floatingPlaceholder
            value={attribute.name}
            onChangeText={() => {}}
            disabled
            migrateTextField
          />

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
          <Button label={'remove'} />
        </View>
      ))}
    </Card>
  );
};

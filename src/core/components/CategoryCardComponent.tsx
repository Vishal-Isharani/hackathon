import {Category} from '../../shared/models';
import React from 'react';
import {Card, Colors, Text, View} from 'react-native-ui-lib';
import {TextField} from 'react-native-ui-lib/src/incubator';
import Icon from 'react-native-vector-icons/AntDesign';
import {Control} from 'react-hook-form/dist/types';
import {AddAttributeComponent} from './AddAttributeComponent';

type Props = {
  category: Category;
  categoryField: any;
  control: Control<Category>;
  removeField: (index: number) => void;
};

export const CategoryCardComponent = ({
  category,
  control,
  removeField,
}: Props) => {
  return (
    <Card margin-10 paddingB-5 br10 flex>
      <View padding-10>
        <View row paddingT-10 paddingH-5 spread>
          <Text>{category.name}</Text>
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

        {category.attributes.map((attribute, index) => (
          <AddAttributeComponent
            key={category.id}
            categoryField={category}
            control={control}
            index={index}
            removeField={ind => removeField(ind)}
          />
        ))}
      </View>
    </Card>
  );
};

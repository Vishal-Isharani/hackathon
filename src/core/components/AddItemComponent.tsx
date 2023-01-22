import {
  CategoryAttribute,
  CategoryItem,
  ControlType,
} from '../../shared/models';
import {Controller} from 'react-hook-form';
import * as React from 'react';
import {TextField} from 'react-native-ui-lib/src/incubator';
import {
  Button,
  Card,
  Checkbox,
  DateTimePicker,
  View,
} from 'react-native-ui-lib';
import {InputComponent} from './Input';

type Props = {
  categoryId: string;
  item: CategoryItem;
  attributes: CategoryAttribute[];
  removeCategoryItem: (categoryId: string, itemId: string) => void;
  control: any;
};

export const AddItemComponent = ({
  categoryId,
  item,
  attributes,
  removeCategoryItem,
  control,
}: Props) => {
  const renderText = (attribute: CategoryAttribute, field: any) => {
    return (
      <InputComponent
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
    <Card margin-10 paddingB-5 br10 flex>
      <View key={item.id} padding-10 margin-10 br10 flex paddingB-5>
        {attributes.map(attribute => (
          <View key={attribute.id}>{renderControl(attribute)}</View>
        ))}
        <Button
          onPress={() => removeCategoryItem(categoryId, item.id)}
          label="Remove"
        />
      </View>
    </Card>
  );
};

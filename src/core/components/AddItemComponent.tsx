import {
  CategoryAttribute,
  CategoryItem,
  ControlType,
} from '../../shared/models';
import {Controller} from 'react-hook-form';
import * as React from 'react';
import {
  Button,
  ButtonSize,
  Card,
  Checkbox,
  DateTimePicker,
  View,
} from 'react-native-ui-lib';
import {InputComponent} from './InputComponent';

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
      <View
        br20
        marginB-10
        padding-5
        style={{
          borderWidth: 0.5,
        }}>
        <DateTimePicker
          title={attribute.name}
          placeholder={attribute.name}
          mode={'date'}
          onChange={(date: Date) => field.onChange(date)}
        />
      </View>
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
        <View center>
          <Button
            size={ButtonSize.small}
            outline
            onPress={() => removeCategoryItem(categoryId, item.id)}
            label="Remove"
          />
        </View>
      </View>
    </Card>
  );
};

import {TextField} from 'react-native-ui-lib/src/incubator';
import React from 'react';
import {View} from 'react-native-ui-lib';

export const InputComponent = (props: any) => {
  return (
    <View
      br20
      marginB-10
      padding-5
      style={{
        borderWidth: 0.5,
      }}>
      <TextField
        text80
        placeholder={'Name'}
        floatingPlaceholder
        migrate
        enableErrors
        value={props.value}
        onChangeText={(text: string) => props.onChange(text)}
        {...props}
      />
    </View>
  );
};

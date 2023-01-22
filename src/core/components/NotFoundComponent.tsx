import * as React from 'react';
import {Text, View} from 'react-native-ui-lib';

type Props = {
  message: string;
};

export const NotFoundComponent = ({message}: Props) => {
  return (
    <View center paddingT-10>
      <Text>{message}</Text>
    </View>
  );
};

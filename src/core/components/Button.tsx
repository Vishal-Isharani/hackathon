import {Button, ButtonProps} from 'react-native-ui-lib';
import React from 'react';

export const ButtonComponent = (
  props: React.ComponentClass<ButtonProps> & typeof Button,
) => {
  return <Button {...props}></Button>;
};

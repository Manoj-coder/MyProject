import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

const Button = ({ onPress, title }) => {
    return <PaperButton onPress={onPress}>{title}</PaperButton>;
};

export default Button;

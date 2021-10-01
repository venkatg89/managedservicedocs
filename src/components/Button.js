import React from 'react';
import { Button as RN_Button, Platform} from 'react-native';
// import { withTheme } from "@callstack/react-theme-provider";

const ButtonComponent = props => (
    <RN_Button {...props} color={Platform.OS == 'ios' ? props.color ? props.color : props.theme.colors.contrast : undefined}/>
)

// const Button = withTheme(ButtonComponent);
// export { Button };

export {ButtonComponent};
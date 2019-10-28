import React from 'react';
import { myTheme, mySizes } from '../../../data/config/myStyles';
import { Button, ButtonProps } from 'react-native-elements';

interface Props extends ButtonProps {
	mode?: 'contained' | 'text' | 'outlined';
	color: string;
	round?: boolean;
}

export default class MyButton extends React.PureComponent<Props, {}> {
	public static defaultProps: Partial<Props> = {
		color: 'primary',
		mode: 'text'
	};
	render() {
		let buttonStyle: any = {};
		let titleStyle: any = {};
		const { mode, color, round, ...rest } = this.props;
		if (mode == 'contained') {
			buttonStyle = { backgroundColor: myTheme[color].main };
			titleStyle = { color: myTheme[color].contrastText };
		} else if (mode == 'text') {
			buttonStyle = { backgroundColor: 'transparent' };
			titleStyle = { color: myTheme[color].main };
		} else if (mode == 'outlined') {
			buttonStyle = { backgroundColor: 'transparent', borderWidth: mySizes.border, borderColor: myTheme[color].main };
			titleStyle = { color: myTheme[color].main };
		}
		if (round) {
			buttonStyle.borderRadius = 25;
		}
		return <Button buttonStyle={buttonStyle} titleStyle={titleStyle} {...rest} />;
	}
}

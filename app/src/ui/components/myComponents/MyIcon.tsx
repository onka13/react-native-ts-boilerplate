import React from 'react';
import { myTheme, themeProps } from '../../../data/config/myStyles';
import { Icon, IconProps } from 'react-native-elements';

interface Props extends IconProps {
	mode?: 'default' | 'reverse';
	theme?: themeProps
}

export default class MyIcon extends React.PureComponent<Props, {}> {
	public static defaultProps: Partial<Props> = {
		theme: 'primary',
		mode: 'default'
	};
	render() {
		const { mode, theme,...rest } = this.props;
		if (theme) {
			rest.color = myTheme[theme].main
		}
		if (mode == 'reverse') {
			rest.color = myTheme.icon.reverse
		}
		return <Icon {...rest} />;
	}
}

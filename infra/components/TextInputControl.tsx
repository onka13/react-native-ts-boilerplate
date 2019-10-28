import React from 'react';
import { Input, InputProps } from 'react-native-elements';
import BaseSaltComponent from './BaseSaltComponent';
import { stringFormat } from '../helpers/utils';
import { StyleProp, TextStyle } from 'react-native';

type messageType = undefined | 'primary' | 'secondary' | 'error' | 'success' | 'info';

interface Prop extends InputProps {
	value?: string;
	onChangeText?: (val: string) => {};
	validateOnBlur?: boolean;
	validateOnChange?: boolean;
	validation?: any[];
	readonly?: boolean;
	messageType?: messageType;
	message?: string;
	defaultStyles?: any;
	validationMessages?: { [key: string]: any };
}

interface State {
	text: string;
	editable: boolean;
	messageType?: messageType;
	message: string;
}

export default class TextInputControl extends BaseSaltComponent<Prop, State> {
	rules: any = [];
	state: State = {
		text: '',
		editable: true,
		message: '',
	};
	defaultStyles: any = {
		success: '#4caf50',
		info: '#009688',
		warning: '#fb8c00',
		error: '#e53935',
	};
	validationMessages: any = {
		required: 'Required',
		minLength: 'Must be {0} characters at least',
		maxLength: 'Must be {0} characters or less',
		minValue: 'Must be at least {0}',
		maxValue: 'Must be {0} or less',
		number: 'Must be a number',
		email: 'Must be a valid email',
	};
	input!: Input;
	constructor(props: any) {
		super(props);
		this.onChangeText = this.onChangeText.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.init(props);
	}
	componentWillReceiveProps(nextProps: any) {
		if (this.props.value == nextProps.value) {
			return;
		}
		this.init(nextProps);
		this.setState(this.state);
	}
	init(props: Prop) {
		this.rules = props.validation || [];
		this.state.editable = !props.readonly;
		if (typeof props.messageType != 'undefined') this.state.messageType = props.messageType;
		if (typeof props.message != 'undefined') this.state.message = props.message;
		if (props.value) this.state.text = props.value;
		if (props.defaultStyles) this.defaultStyles = props.defaultStyles;
		if (props.validationMessages) this.validationMessages = props.validationMessages;
	}
	setTextInputRef = (e: Input) => {
		this.input = e;
	};
	getValue() {
		return this.state.text;
	}
	setValue(text: string) {
		this.setState({ text });
		if (this.props.onChangeText) this.props.onChangeText(text);
		if (this.props.validateOnChange) this.validate();
	}
	onChangeText(text: string) {
		this.setValue(text);
	}
	onBlur() {
		if (this.props.validateOnBlur) this.validate();
	}
	focus() {
		this.input && this.input.focus();
	}
	getInput() {
		return this.input;
	}
	shake() {
		this.input && this.input.shake();
	}
	isValidated() {
		return this.validate();
	}
	validate() {
		const text = this.state.text;
		for (let i = 0; i < this.rules.length; i++) {
			if (Array.isArray(this.rules[i])) {
				if (!new RegExp(this.rules[i][0]).test(text)) {
					return this.validateError('regex', this.rules[i][1]);
				}
				continue;
			}
			var values = this.rules[i].split(':');
			var name = values[0];
			if (!text) {
				if (name == 'required') return this.validateError(name);
				continue;
			}
			switch (name) {
				case 'minLength':
					if (text.length < parseFloat(values[1])) {
						return this.validateError(name, values[1]);
					}
					break;
				case 'maxLength':
					if (text.length > parseFloat(values[1])) {
						return this.validateError(name, values[1]);
					}
					break;
				case 'minValue':
					if (parseFloat(text) < parseFloat(values[1])) {
						return this.validateError(name, values[1]);
					}
					break;
				case 'maxValue':
					if (parseFloat(text) > parseFloat(values[1])) {
						return this.validateError(name, values[1]);
					}
					break;
				case 'email':
					var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (!re.test(String(text).toLowerCase())) {
						return this.validateError(name);
					}
					break;
				default:
					break;
			}
		}
		return this.validateError();
	}
	validateError(name?: string, arg0?: any) {
		if (!name) {
			this.setState({ messageType: 'success', message: '' });
			return true;
		}
		this.setState({ messageType: 'error', message: name == 'regex' ? arg0 : stringFormat(this.validationMessages[name], arg0) }, () => {
			this.shake();
		});
		return false;
	}
	render() {
		const inputContainerStyle: StyleProp<TextStyle> = {};
		const errorStyle: StyleProp<TextStyle> = { alignSelf: 'flex-end' };
		if (this.state.messageType) {
			inputContainerStyle.borderColor = this.defaultStyles[this.state.messageType];
			errorStyle.color = this.defaultStyles[this.state.messageType];
		}
		return (
			<Input
				inputContainerStyle={inputContainerStyle}
				errorMessage={this.state.message}
				errorStyle={errorStyle}
				onBlur={this.onBlur}
				{...this.props}
				onChangeText={this.onChangeText}
				value={this.state.text}
				ref={this.setTextInputRef}
			/>
		);
	}
}

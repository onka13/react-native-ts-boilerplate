import React from 'react';
import { View } from 'react-native';
import { connect } from '../../../../business/redux_source/ReduxHelper';
import BaseComponent from '../../../components/BaseComponent';
import MyContainer from '../../../components/myComponents/MyContainer';
import MyContent from '../../../components/myComponents/MyContent';
import { createStyles, mySizes } from '../../../../data/config/myStyles';
import { ViewFlex, Imgv2 } from 'infra/components/MixComponents';
import TextInputControl from 'infra/components/TextInputControl';
import assets from '../../../../assets/index';
import AccountBusinessLogic from '../../../../business/services/AccountBusinessLogic';
import MyButton from '../../../components/myComponents/MyButton';

class Login extends BaseComponent<{}, {}> {
	state = {};
	_email!: TextInputControl;
	_pass!: TextInputControl;
	componentDidMount() {
		super.componentDidMount();
		if (__DEV__) {
			this._email.setValue('kaya@k.com');
			this._pass.setValue('123');
		}
	}
	login = () => {
		if (!this._email.isValidated() || !this._pass.isValidated()) return;
		this.displayLoading(true);
		AccountBusinessLogic.login(this._email.getValue(), this._pass.getValue())
			.then((response: any) => {
				console.log('response', response);
			})
			.catch(this.apiReject)
			.finally(() => {
				this.displayLoading(false);
			});
	};
	forgot = () => {};
	signUp = () => {
		this.goToPage('SignUp');
	};
	render() {
		return (
			<MyContainer>
				<MyContent>
					<ViewFlex style={styles.logoParent}>
						<Imgv2 source={assets.icon} />
					</ViewFlex>
					<TextInputControl
						onRef={c => (this._email = c as TextInputControl)}
						placeholder="Email"
						leftIcon={{ name: 'email-open-outline', type: 'material-community' }}
						validateOnBlur={true}
						keyboardType="email-address"
						autoCompleteType="email"
						validation={['required', 'email']}
					/>
					<TextInputControl
						onRef={c => (this._pass = c as TextInputControl)}
						placeholder="Password"
						leftIcon={{ name: 'lock-open-outline', type: 'material-community' }}
						validateOnBlur={true}
						autoCompleteType="email"
						validation={['required', 'minLength:3']}
						secureTextEntry={true}
					/>
					<View style={{ alignItems: 'flex-end', marginBottom: 15 }}>
						<MyButton title="Forgot login details?" mode="text" onPress={this.forgot} />
					</View>
					<MyButton title="Login" mode="contained" round onPress={this.login} />
					<MyButton title="Sign up here" mode="text" onPress={this.signUp} />
				</MyContent>
			</MyContainer>
		);
	}
}

const styles = createStyles({
	logoParent: {
		paddingVertical: mySizes.padding2,
	},
});

export default connect(
	Login,
	'account',
);

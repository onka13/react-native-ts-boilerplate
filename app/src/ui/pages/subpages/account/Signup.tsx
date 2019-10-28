import React from 'react';
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
import { View } from 'react-native';

class Signup extends BaseComponent<{}, {}> {
	state = {};
	_name!: TextInputControl;
	_email!: TextInputControl;
	_pass!: TextInputControl;
	componentDidMount() {
		super.componentDidMount();
		if (__DEV__) {
			this._email.setValue('kaya@example.com');
			this._pass.setValue('123');
		}
	}
	signUp = () => {
		if (!this._name.isValidated() || !this._email.isValidated() || !this._pass.isValidated()) return;
		this.displayLoading(true);
		AccountBusinessLogic.signup(this._name.getValue(), this._email.getValue(), this._pass.getValue())
			.then((response: any) => {
				console.log('response signup', response);
				this.goToPageAndResetAll('Home');
			})
			.catch(this.apiReject)
			.finally(() => {
				this.displayLoading(false);
			});
	};
	render() {
		return (
			<MyContainer>
				<MyContent>
					<ViewFlex style={styles.logoParent}>
						<Imgv2 source={assets.icon} />
					</ViewFlex>
					<TextInputControl
						onRef={c => (this._name = c as TextInputControl)}
						placeholder="Name"
						leftIcon={{ name: 'email-open-outline', type: 'material-community' }}
						validateOnBlur={true}
						keyboardType="email-address"
						autoCompleteType="name"
						validation={['required']}
					/>
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
						<MyButton
							title="Go back to login"
							mode="text"
							onPress={() => {
								this.goBack();
							}}
						/>
					</View>
					<MyButton title="Sign Up" mode="contained" round onPress={this.signUp} />
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
	Signup,
	'account',
);

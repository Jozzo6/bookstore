import PropTypes from 'prop-types';
import { useState } from 'react';
import userService from '../../../services/user.service';
import CustomInput from '../../../components/CustomInput';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';
import { FormState } from '../../../services/enums';

function UserInfo({ user, onClose }) {
	const [u, setUser] = useState(user);
	const [state, setState] = useState(FormState.Idle);
	const [errMessage, setErrMessage] = useState(null);

	const update = async (e) => {
		try {
			setErrMessage(null);
			setState(FormState.Loading);
			e.preventDefault();
			let updated = await userService.updateUser(u);
			setState(FormState.Success);
			onClose(updated);
		} catch (e) {
			setState(FormState.Error);
			setErrMessage(e.message);
		}
	};

	const close = () => {
		if (state === FormState.Loading) {
			return;
		} else if (state === FormState.Idle) {
			onClose(null);
		} else if (state === FormState.Success) {
			onClose(u);
		} else if (state === FormState.Error || state === FormState.Edited) {
			if (window.confirm('Are you sure you want to discard changes?')) {
				onClose(null);
			}
		}
	};

	return (
		<div>
			<div className='d-flex column justify-content-between'>
				<h3>User Info </h3>
				<SecondaryButton
					text='Close'
					disabled={state === FormState.Loading}
					onClick={close}
				/>
			</div>
			<form onSubmit={update}>
				<CustomInput
					label='Email'
					name='email'
					value={u.email}
					onChange={(e) => {
						setUser({ ...u, email: e.target.value });
						setState(FormState.Edited);
					}}
					type='text'
				/>
				<CustomInput
					label='First Name'
					name='first_name'
					value={u.first_name}
					onChange={(e) => {
						setUser({ ...u, first_name: e.target.value });
						setState(FormState.Edited);
					}}
					type='text'
				/>
				<CustomInput
					label='Last Name'
					name='last_name'
					value={u.last_name}
					onChange={(e) => {
						setUser({ ...u, last_name: e.target.value });
						setState(FormState.Edited);
					}}
					type='text'
				/>
				<CustomInput
					label='Account Type'
					name='type'
					value={u.type}
					onChange={(e) => {
						setUser({ ...u, type: e.target.value });
						setState(FormState.Edited);
					}}
					type='text'
				/>
				<div className='d-flex row'>
					<PrimaryButton
						type='submit'
						disabled={state === FormState.Loading}
						text='Update'
						onClick={update}
					/>
				</div>
				{state === FormState.Error && errMessage && (
					<div className='alert alert-danger mt-3' role='alert'>
						{errMessage || 'An error occurred'}
					</div>
				)}
			</form>
		</div>
	);
}

UserInfo.propTypes = {
	user: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default UserInfo;

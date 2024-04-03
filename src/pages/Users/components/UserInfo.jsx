import { useEffect, useState } from 'react';
import userService from '../../../services/user.service';
import CustomInput from '../../../components/CustomInput';
import PrimaryButton from '../../../components/PrimaryButton';
import { FormState, StateEnum } from '../../../services/enums';
import { useLocation } from 'react-router-dom';

function UserInfo() {
	const location = useLocation();
	const user = location.state.user;

	const [u, setUser] = useState(user);
	const [userState, setUserState] = useState(StateEnum.UnInitialized);
	const [formState, setFormState] = useState(FormState.Idle);
	const [errMessage, setErrMessage] = useState(null);

	const update = async (e) => {
		try {
			setErrMessage(null);
			setFormState(FormState.Loading);
			e.preventDefault();
			await userService.updateUser(u);
		} catch (e) {
			setFormState(FormState.Error);
			setErrMessage(e.message);
		}
	};

	useEffect(() => {
		if (userState === StateEnum.UnInitialized) {
			if (u === null) {
				getUser();
			} else {
				setUserState(StateEnum.Success);
			}
		}
	}, [u, userState]);

	const getUser = async () => {
		try {
			setUserState(StateEnum.Loading);
			const user = await userService.getUser(u.id);
			setUser(user);
			setUserState(StateEnum.Success);
		} catch (error) {
			setFormState(FormState.Error);
		}
	};

	return (
		<div>
			<h3>User Info </h3>
			{userState === StateEnum.Loading && <div>Loading...</div>}
			{userState === StateEnum.Error && <div>An error occurred</div>}
			{userState === StateEnum.Success && (
				<form onSubmit={update}>
					<CustomInput
						label='Email'
						name='email'
						value={u.email}
						onChange={(e) => {
							setUser({ ...u, email: e.target.value });
							setFormState(FormState.Edited);
						}}
						type='text'
					/>
					<CustomInput
						label='First Name'
						name='first_name'
						value={u.first_name}
						onChange={(e) => {
							setUser({ ...u, first_name: e.target.value });
							setFormState(FormState.Edited);
						}}
						type='text'
					/>
					<CustomInput
						label='Last Name'
						name='last_name'
						value={u.last_name}
						onChange={(e) => {
							setUser({ ...u, last_name: e.target.value });
							setFormState(FormState.Edited);
						}}
						type='text'
					/>
					<CustomInput
						label='Account Type'
						name='type'
						value={u.type}
						onChange={(e) => {
							setUser({ ...u, type: e.target.value });
							setFormState(FormState.Edited);
						}}
						type='text'
					/>
					<div className='d-flex row'>
						<PrimaryButton
							type='submit'
							disabled={formState === FormState.Loading}
							text='Update'
							onClick={update}
						/>
					</div>
					{formState === FormState.Error && errMessage && (
						<div className='alert alert-danger mt-3' role='alert'>
							{errMessage || 'An error occurred'}
						</div>
					)}
				</form>
			)}
		</div>
	);
}

export default UserInfo;

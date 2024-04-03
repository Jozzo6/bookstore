import { useEffect, useState } from 'react';
import userService from '../../services/user.service';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import { FormState, MessageBoxType, StateEnum } from '../../services/enums';
import { useLocation } from 'react-router-dom';
import BorrowedListByUser from './components/BorrowedBooksByUser';
import { useAuth } from '../../services/auth.service';
import Loading from '../../components/Loading/Loading';
import { useMessageBox } from '../../components/MessageBox/MessageBox';

function UserInfoPage() {
	const location = useLocation();
	const user = location.state.user;
	const { hasAccess } = useAuth();
	const { showMessage } = useMessageBox();

	const [u, setUser] = useState(user);
	const [userState, setUserState] = useState(StateEnum.UnInitialized);
	const [formState, setFormState] = useState(FormState.Idle);

	const update = async (e) => {
		try {
			e.preventDefault();
			setFormState(FormState.Loading);
			await userService.updateUser(u);
			showMessage('User updated successfully', MessageBoxType.Success);
		} catch (e) {
			showMessage('Failed to update user', MessageBoxType.Error);
			setFormState(FormState.Error);
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
			{userState === StateEnum.Loading && <Loading />}
			{userState === StateEnum.Error && <div>An error occurred</div>}
			{userState === StateEnum.Success && (
				<div>
					<form onSubmit={update}>
						<CustomInput
							label='Email'
							name='email'
							value={u.email}
							onChange={(e) => {
								setUser({ ...u, email: e.target.value });
								setFormState(FormState.Edited);
							}}
							disabled={!hasAccess(3)}
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
							disabled={!hasAccess(3)}
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
							disabled={!hasAccess(3)}
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
							disabled={!hasAccess(3)}
							type='text'
						/>
						<div className='d-flex row'>
							<PrimaryButton
								type='submit'
								disabled={formState === FormState.Loading || !hasAccess(3)}
								text='Update'
								onClick={update}
							/>
						</div>
					</form>
					<div className='mt-3'>
						<BorrowedListByUser user={u} />
					</div>
				</div>
			)}
		</div>
	);
}

export default UserInfoPage;

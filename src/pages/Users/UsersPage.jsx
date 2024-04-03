import { useState, useEffect, useCallback } from 'react';
import userService from '../../services/user.service.jsx';
import { StateEnum } from '../../services/enums.jsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading.jsx';

function UserPage() {
	const [userState, setUserState] = useState(StateEnum.UnInitialized);
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

	const getUsers = useCallback(async () => {
		try {
			setUserState(StateEnum.Loading);
			setUsers(await userService.getAllUsers());
			setUserState(StateEnum.Success);
		} catch (e) {
			setUserState(StateEnum.Error);
		}
	}, []);

	useEffect(() => {
		if (userState === StateEnum.UnInitialized) {
			getUsers();
		}
	}, [userState, getUsers]);

	const openUserInfo = (user) => {
		navigate(`/users/${user.id}`, { state: { user } });
	};

	return (
		<div className='container'>
			<h3 className='m-4'>Users Page</h3>
			{userState === 'loading' && <Loading />}
			{userState === 'error' && <p>Error loading users</p>}
			{userState === 'success' && (
				<table className='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>Email</th>
							<th scope='col'>First Name</th>
							<th scope='col'>Last Name</th>
							<th scope='col'>Account Type</th>
							<th scope='col'>Created</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr
								key={user.id}
								onClick={() => {
									openUserInfo(user);
								}}
							>
								<td>{user.email}</td>
								<td>{user.first_name}</td>
								<td>{user.last_name}</td>
								<td>{user.type}</td>
								<td>{user.created}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default UserPage;

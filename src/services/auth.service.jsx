import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { UserTypeEnum } from './enums';
// import { AuthEnum } from '../enums/auth-enum';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [authValue, setAuthValue] = useState(
		JSON.parse(localStorage.getItem('auth'))
	);

	const login = async (email, password) => {
		const formData = new FormData();
		formData.append('username', email);
		formData.append('password', password);

		const res = await axios.post('auth/login', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		storeAuthInfo(res.data);
		setAuthValue(res.data);
		return res.data;
	};

	const register = async (email, password, first_name, last_name) => {
		const res = await axios.post('auth/register', {
			email: email,
			password: password,
			first_name: first_name,
			last_name: last_name,
			type: UserTypeEnum.User,
		});
		storeAuthInfo(res.data);
		setAuthValue(res.data);
		return res.data;
	};

	const logout = () => {
		setAuthValue(null);
		localStorage.removeItem('auth');
	};

	const storeAuthInfo = (auth) => {
		localStorage.setItem('auth', JSON.stringify(auth));
	};

	const hasAccess = (minRole) => {
		return authValue && authValue.user.type >= minRole;
	};

	const authContextValue = {
		authValue: authValue,
		login: login,
		register: register,
		logout: logout,
		storeAuthInfo: storeAuthInfo,
		hasAccess: hasAccess,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return authContext;
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

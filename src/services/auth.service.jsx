import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import { AuthEnum } from '../enums/auth-enum';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [authState, setAuthState] = useState(
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
		setAuthState(res.data);
		return res.data;
	};

	const register = async (email, password, first_name, last_name) => {
		const res = await axios.post('auth/register', {
			email: email,
			password: password,
			first_name: first_name,
			last_name: last_name,
			type: 'customer',
		});
		storeAuthInfo(res.data);
		setAuthState(res.data);
		return res.data;
	};

	const logout = () => {
		setAuthState(null);
		localStorage.removeItem('auth');
	};

	const storeAuthInfo = (auth) => {
		localStorage.setItem('auth', JSON.stringify(auth));
	};

	const authContextValue = {
		authState: authState,
		login: login,
		register: register,
		logout: logout,
		storeAuthInfo: storeAuthInfo,
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

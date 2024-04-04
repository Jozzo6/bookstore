import './App.css';
import LoginPage from './pages/LoginPage';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import { useAuth } from './services/auth.service';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { useLocation } from 'react-router-dom';
import { StateEnum } from './services/enums';
import axios from 'axios';
import Loading from './components/Loading/Loading';
import {
	MessageBox,
	MessageBoxProvider,
} from './components/MessageBox/MessageBox';

function App() {
	return (
		<>
			<MessageBoxProvider>
				<MessageBox />
				<Router>
					<AppRoutes />
				</Router>
			</MessageBoxProvider>
		</>
	);
}

function AppRoutes() {
	const { authValue } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(StateEnum.Loading);

	useEffect(() => {
		if (!authValue && location.pathname !== '/register') {
			navigate('/login');
		}
		axios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${authValue?.access_token}`;
		if (authValue?.user?.type === 1 && location.pathname !== '/home') {
			navigate('/home');
		}
		setIsLoading(StateEnum.Success);
	}, [authValue, navigate, location]);

	if (isLoading == StateEnum.Loading) {
		return <Loading />;
	}

	return (
		<>
			<main>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/home' element={<HomePage />} />
					<Route path='*' element={<HomePage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;

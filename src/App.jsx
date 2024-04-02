import './App.css';
import LoginPage from './pages/LoginPage';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import { useAuth } from './services/auth.service';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { useLocation } from 'react-router-dom';

function App() {
	return (
		<>
			<Router>
				<AppRoutes />
			</Router>
		</>
	);
}

function AppRoutes() {
	const { authState } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!authState && location.pathname !== '/register') {
			navigate('/login');
		}
	}, [authState, navigate, location]);

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

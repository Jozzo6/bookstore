import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../services/auth.service';
import SecondaryButton from '../components/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { useMessageBox } from '../components/MessageBox/MessageBox';
import { MessageBoxType } from '../services/enums';

function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const { showMessage } = useMessageBox();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginAction = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
			navigate('/home');
		} catch (error) {
			showMessage('Failed to login', MessageBoxType.Error);
		}
	};

	const isValid = () => {
		return email !== '' && password !== '';
	};

	return (
		<div className='container'>
			<h1 className='h1 mb-5'>Login Page</h1>
			<div className='card'>
				<div className='card-body'>
					<form onSubmit={loginAction} className='mb-3'>
						<CustomInput
							label='Email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							placeholder='Email'
						/>
						<CustomInput
							label='Password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							placeholder='Password'
							obscure='true'
						/>
						<PrimaryButton
							type='submit'
							text='Login'
							onClick={loginAction}
							disabled={!isValid()}
						/>
					</form>
					<SecondaryButton
						text='Register'
						onClick={() => navigate('/register')}
					/>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

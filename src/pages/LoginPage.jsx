import { useState } from 'react';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../services/auth.service';
import SecondaryButton from '../components/SecondaryButton';

function LoginPage() {
	const { login } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginAction = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch (error) {
			console.error(error);
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
						onClick={() => console.log('register')}
					/>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

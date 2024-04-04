import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import 'jest-localstorage-mock';
import React from 'react';
import { AuthProvider, useAuth } from '../auth.service';
import { UserTypeEnum } from '../enums';

jest.mock('axios');

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('Auth service', () => {
	beforeAll(() => {
		global.localStorage = {
			getItem: jest.fn((key) => {
				if (key === 'auth') {
					return JSON.stringify({ user: { type: UserTypeEnum.Librarian } }); // return a valid JSON string
				}
			}),
			setItem: jest.fn(),
			clear: jest.fn(),
		};
		const defaultAuthValue = { user: { type: UserTypeEnum.User } };
		localStorage.setItem('auth', JSON.stringify(defaultAuthValue));
	});

	it('performs login', async () => {
		const user = { username: 'test', password: 'test' };
		axios.post.mockResolvedValue({ data: user });

		const { result } = renderHook(() => useAuth(), { wrapper });

		await act(async () => {
			const response = await result.current.login(user.username, user.password);
			expect(response).toEqual(user);
		});
	});

	it('performs registration', async () => {
		const user = {
			email: 'test@test.com',
			password: 'test',
			first_name: 'Test',
			last_name: 'User',
		};
		axios.post.mockResolvedValue({ data: user });

		const { result } = renderHook(() => useAuth(), { wrapper });

		await act(async () => {
			const response = await result.current.register(
				user.email,
				user.password,
				user.first_name,
				user.last_name
			);
			expect(response).toEqual(user);
		});
	});

	it('checks access - denied', () => {
		const user = { user: { type: 1 } };
		const { result } = renderHook(() => useAuth(), { wrapper });

		act(() => {
			result.current.storeAuthInfo(user);
			expect(result.current.hasAccess(3)).toBeFalsy();
		});
	});

	it('checks access - granted', () => {
		const user = { user: { type: 3 } };
		const { result } = renderHook(() => useAuth(), { wrapper });

		act(() => {
			result.current.storeAuthInfo(user);
			expect(result.current.hasAccess(1)).toBeTruthy();
		});
	});
});

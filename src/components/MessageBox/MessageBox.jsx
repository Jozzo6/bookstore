import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import './MessageBox.css';

const MessageBoxContext = createContext();

export function MessageBoxProvider({ children }) {
	const [messageBox, setMessageBox] = useState({ message: null, type: null });
	let timeout = null;

	function showMessage(message, type) {
		clearTimeout(timeout);
		setMessageBox({ message, type });
		timeout = setTimeout(() => {
			setMessageBox({ message: null, type: null });
		}, 3000);
	}

	return (
		<MessageBoxContext.Provider value={{ messageBox, showMessage }}>
			{children}
		</MessageBoxContext.Provider>
	);
}

MessageBoxProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export function useMessageBox() {
	const context = useContext(MessageBoxContext);
	if (!context) {
		throw new Error('useMessageBox must be used within a MessageBoxProvider');
	}
	return context;
}

export function MessageBox() {
	const { messageBox } = useMessageBox();
	return messageBox.message ? (
		<div className={`message-box ${messageBox.type}`}>
			<h5>{messageBox.message}</h5>
		</div>
	) : null;
}

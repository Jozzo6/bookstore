import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ isOpen, children }) {
	if (!isOpen) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className='modal'>
			<div className='modal-content'>{children}</div>
		</div>,
		document.body
	);
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
};

export default Modal;

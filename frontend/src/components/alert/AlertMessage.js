import { Alert } from 'react-bootstrap';
import "./AlertMessage.css";

const AlertMessage = ({ message }) => {
	return (
		<Alert variant="info" className='alert-container'>
			<Alert.Heading className='alert-message'>{message}</Alert.Heading>
		</Alert>
	)
}

export default AlertMessage;
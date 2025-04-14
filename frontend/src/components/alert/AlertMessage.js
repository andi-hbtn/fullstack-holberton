import { Alert } from 'react-bootstrap';
import "./AlertMessage.css";

const AlertMessage = ({status,message}) => {
	console.log("status---",status);
	return (
		<Alert variant="info" className='alert-container'>
			<Alert.Heading className='alert-message'>
					<strong>{status}</strong>
					{message}
			</Alert.Heading>
		</Alert>
	)
}

export default AlertMessage;
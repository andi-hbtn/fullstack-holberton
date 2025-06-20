import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}api/contact`;

const sendMessage = async (data) => {
    const result = await axios.post(`${url}`,data);
    return result;
}

export { sendMessage };
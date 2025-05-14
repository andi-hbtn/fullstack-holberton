const formatDate = () => {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const formatIsoDateTime = (dateParam) => {
    const date = new Date(dateParam);
    return date.toLocaleString();
}

export default {
    formatDate,
    formatIsoDateTime,
};
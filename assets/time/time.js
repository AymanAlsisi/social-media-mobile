export const getCurrentTime = () => {
    const now = new Date();

    let year = now.getFullYear(),
        month = now.getMonth() + 1,
        days = now.getDate(),
        hrs = now.getHours(),
        mins = now.getMinutes();

    if (month < 10) month = `0${month}`;
    if (days < 10) days = `0${days}`;
    if (hrs < 10) hrs = `0${hrs}`;
    if (mins < 10) mins = `0${mins}`;

    return `${year}-${month}-${days}T${hrs}:${mins}`;
}

export function timeAgo(date) {
    const myDate = new Date(date);
    const seconds = Math.floor((new Date() - myDate) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }

    return Math.floor(seconds) + " seconds ago";
}

export const getMessageTime = (time) => {
    const date = new Date(time),
        hrs = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${hrs}:${mins}`;
}
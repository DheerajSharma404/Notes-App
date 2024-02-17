export const getTimestamp = (createdAt) => {
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago on ${getJoinedDate(
      createdAt
    )}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago on ${getJoinedDate(
      createdAt
    )}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago on ${getJoinedDate(
      createdAt
    )}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago on ${getJoinedDate(
      createdAt
    )}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago on ${getJoinedDate(
      createdAt
    )}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago on ${getJoinedDate(
      createdAt
    )}`;
  }
};

export const getJoinedDate = (date) => {
  const days = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${days} ${month} ${year}`;
};

export const formatTime = (timeString) => {
  const time = new Date(timeString);
  let hours = time.getHours().toString();
  let minutes = time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
};




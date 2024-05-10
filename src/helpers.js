export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return (
    date.getUTCDate() +
    "." +
    (date.getUTCMonth() + 1) +
    "." +
    date.getUTCFullYear() +
    " "
  );
};

export const formatDateByHour = (timestamp) => {
  const date = new Date(timestamp);
  return (
    date.getUTCHours() + ":" + date.getUTCMinutes().toString().padStart(2, "0")
  );
};

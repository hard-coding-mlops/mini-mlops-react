const formatDateTime = (dateTimeString) => {
  const inputDate = new Date(dateTimeString);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');

  const hours = inputDate.getHours().toString().padStart(2, '0');
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');

  const formattedDateTime = `${year} / ${month} / ${day}   ${hours} : ${minutes}`;

  return formattedDateTime;
};

const ceilToOne = (num) => {
  return Math.ceil(num * 10) / 10;
};

export { formatDateTime, ceilToOne };

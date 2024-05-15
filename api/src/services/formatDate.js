function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = `${date.getHours()}:${date.getMinutes()}`;
  const formattedDate = `${day}-${month}-${year}-${hour}`;
  return formattedDate;
}

module.exports = {formatDate};
const date2Text = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const daysDiff = diff / (1000 * 3600 * 24);
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
    return "today";
  else if (daysDiff < 365) {
    return `${Math.floor(daysDiff)} days ago`;
  } else return `${Math.floor(daysDiff / 365)} years ago`;
};

export { date2Text };

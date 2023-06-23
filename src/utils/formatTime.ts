export const formatTime = (time: Date) => {
  const day = time.getDate().toString().padStart(2, '0');
  const month = (time.getMonth() + 1).toString().padStart(2, '0');
  const year = time.getFullYear().toString().slice(-2);
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}, ${day}/${month}/${year}`;
};

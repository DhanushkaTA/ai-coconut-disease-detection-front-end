export function convertToStandardDate(isoDate:string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString(); // 2/9/2026
}

export function convertToStandardDateTime(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleString(); //2/9/2026, 5:44:41 PM
}

export function formatDateYYYYMMDD(isoDate: string) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`; //2026-02-09
}
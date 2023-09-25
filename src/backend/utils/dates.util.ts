export const getFutureSaturdayDate = (date: Date, saturdaysDelayed: number) => {
  const day = date.getDay();

  const daysUntilSaturday = 6 - day;

  date.setDate(date.getDate() + daysUntilSaturday + 7 * saturdaysDelayed);

  return date;
};

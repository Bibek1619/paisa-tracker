export const formatCurrency = (amount: number): string => {
  return `NPR ${amount.toLocaleString('en-NP')}`;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-NP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getCurrentMonth = (): string => {
  return new Date().toISOString().slice(0, 7); // Returns "YYYY-MM"
};

export const getMonthName = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

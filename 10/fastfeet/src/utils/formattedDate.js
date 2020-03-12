import { format, parseISO } from 'date-fns';

export default function formattedDate(date) {
  const formatDate = format(parseISO(date), 'dd/MM/yyyy');

  return formatDate;
}

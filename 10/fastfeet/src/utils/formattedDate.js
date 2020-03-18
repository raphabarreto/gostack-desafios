import { format } from 'date-fns';

export default function formattedDate(date) {
  const formatDate = format(new Date(date), 'dd/MM/yyyy');

  return formatDate;
}

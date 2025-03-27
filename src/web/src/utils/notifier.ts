import { toast } from 'react-toastify';

export const notify = (message: string) =>
  toast(message, {
    theme: 'light',
    position: 'bottom-right',
    delay: 0,
  });

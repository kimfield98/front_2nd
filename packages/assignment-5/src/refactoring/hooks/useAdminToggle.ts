import { useState } from 'react';

export const useAdminToggle = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const toggleAdmin = () => setIsAdmin(!isAdmin);
  
  return { isAdmin, toggleAdmin };
};

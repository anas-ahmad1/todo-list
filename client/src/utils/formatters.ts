import { format } from "date-fns";

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    return format(new Date(dateString), "dd MMM, yyyy"); 
  } catch {
    return dateString;
  }
};

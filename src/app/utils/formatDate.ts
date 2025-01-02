export function formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
  
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }
  
  export function formatDateTimeContract(dateString: string): string {
    const date = new Date(dateString);
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  
    return `ngày ${day}, tháng ${month} năm ${year}`;
  }
  
  export const reverseFormatTimeDate = (dateString: string) => {
    const date = new Date(dateString);
  
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
  export const formatDateToYearMonth = (dateString: string): string | null => {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits for the month
    return `${year}-${month}`;
  };
  
  export const formatDateToYearMonthDay = (dateString: string): string | null => {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits for the month
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits for the day
    return `${year}-${month}-${day}`;
  };
  
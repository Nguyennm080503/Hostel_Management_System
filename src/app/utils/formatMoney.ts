export const formatCurrency = (value: string) => {
    const numberValue = parseFloat(value.replace(/[^\d]/g, ""));
    return numberValue
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        }).format(numberValue)
      : "";
  };
  
  export const parseCurrencyToNumber = (value: string) => {
    return value ? parseFloat(value.replace(/[^\d]/g, "")) : 0;
  };

  export const MoneyFormat = (price: number) => {
    if (price != null) {
      const formattedAmount = price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
  
      return formattedAmount;
    }
    return "";
  };
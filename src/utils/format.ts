import dayjs from "dayjs";

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
}

interface FormatDateOptions {
  input: string | number | Date;
  formatType?: "longMonth" | "ddmmyyyy" | "longMonthWithTime" | "ddmmyyyyWithTime";
}

export function formatDate({ input, formatType = "longMonth" }: FormatDateOptions): string {
  let date = dayjs(input);

  switch (formatType) {
    case "longMonth":
      return date.format("MMMM D, YYYY"); // September 26, 2025
    case "ddmmyyyy":
      return date.format("DD/MM/YYYY"); // 26/09/2025
    case "longMonthWithTime":
      return date.format("MMMM D, YYYY HH:mm"); // September 26, 2025 07:00
    case "ddmmyyyyWithTime":
      return date.format("DD/MM/YYYY HH:mm"); // 26/09/2025 07:00
    default:
      return date.toISOString();
  }
}

interface FormatDurationOptions {
  seconds: number;
  formatType?: "mm:ss" | "long";
}

export function formatDuration({ seconds, formatType = "mm:ss" }: FormatDurationOptions): string {
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);

  if (formatType === "long") {
    return `${hours}h ${remainingMinutes}m`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export const parseDateUTC = (val: string | null) => {
  if (!val) return null;
  const parsed = dayjs.utc(val, "DD/MM/YYYY", true);
  return parsed.isValid() ? parsed.toDate() : null;
};

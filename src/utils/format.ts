import dayjs from "dayjs";

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
}

type FormatType = "longMonth" | "ddmmyyyy";

export function formatDate(input: string | number, formatType: FormatType = "longMonth"): string {
  const date = new Date(input);

  switch (formatType) {
    case "longMonth":
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    case "ddmmyyyy":
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    default:
      return date.toISOString();
  }
}

export function formatDurationMmSs(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function formatDurationLong(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export const parseDateUTC = (val: string | null) => {
  if (!val) return null;
  const parsed = dayjs.utc(val, "DD/MM/YYYY", true);
  return parsed.isValid() ? parsed.toDate() : null;
};

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function queryGanarator(obj) {
  const keys = Object.keys(obj).filter((key) => obj[key]);
  return keys.join(",");
}

export function prepareData(obj) {
  const sendPrefix = "senderAddress-";
  const clientPrefix = "clientAddress-";

  const total = Array.isArray(obj.items)
    ? obj.items.reduce((sum, item) => sum + (item.total || 0), 0)
    : 0;

  const result = {
    total,
    senderAddress: {},
    clientAddress: {},
  };

  for (const key in obj) {
    if (key.startsWith(sendPrefix)) {
      const subKey = key.replace(sendPrefix, "");
      result.senderAddress[subKey] = obj[key];
    } else if (key.startsWith(clientPrefix)) {
      const subKey = key.replace(clientPrefix, "");
      result.clientAddress[subKey] = obj[key];
    } else if (key !== "items") {
      result[key] = obj[key];
    }
  }

  return result;
}

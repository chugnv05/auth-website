export const formatDate = (val?: string) => {
  if (!val) return "_";

  return new Date(val).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateTime = (val?: string) => {
  if (!val) return "_";

  return new Date(val).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

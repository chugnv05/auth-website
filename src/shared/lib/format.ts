export const formatDate = (val?: string) => {
  if (!val) return "_";

  return new Date(val).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

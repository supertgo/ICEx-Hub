export function formatCellphone(cellphone: string): string {
  if (!cellphone) return "";

  let value = cellphone;

  value = value.replace(/\D/g, "");

  switch (true) {
    case value.length <= 2:
      return `(${value}`;
    case value.length <= 6:
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    case value.length <= 10:
      return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    default:
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(
        7,
        11
      )}`;
  }
}

export const revertFormatCellphone = (formattedStr: string) => {
  return formattedStr.replace(/\D/g, "");
};

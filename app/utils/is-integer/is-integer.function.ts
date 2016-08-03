export function isInteger(value: any) {
  return typeof value === "number" && 
    isFinite(value) && 
    Math.floor(value) === value;
};
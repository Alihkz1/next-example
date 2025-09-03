export function validateIranPhone(phone: string): boolean {
  const regex = /^(?:\+989|00989|09)\d{9}$/;
  return regex.test(phone);
}

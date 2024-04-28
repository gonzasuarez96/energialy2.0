export function getCompanyId() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("companyId");
  }
}

export function getUserId() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("userId");
  }
}
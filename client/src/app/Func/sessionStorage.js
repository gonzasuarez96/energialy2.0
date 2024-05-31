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

export function getCompanyName() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("companyName");
  }
}
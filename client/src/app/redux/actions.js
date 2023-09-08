export const GET_ALL_COMPANIES = "GET_ALL_COMPANIES";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const FILTER_COMPANIES = "FILTER_COMPANIES";
export const FILTER_COMPANIES_LOCATION = "FILTER_COMPANIES_LOCATION";
export const FILTER_COMPANIES_CATEGORIE = "FILTER_COMPANIES_CATEGORIE";
export const FILTER_COMPANIES_SUBCATEGORIE = "FILTER_COMPANIES_SUBCATEGORIE";

export const setAllCompanies = () => {
  return {
    type: GET_ALL_COMPANIES, 
    payload: companies 
  };
};

export const filterCompaniesByName = (name) => {
  return{
    type: FILTER_COMPANIES,
    payload: name
  }
}
export const fiterCompaniesByLocation = (location) => {
  return {
    type: FILTER_COMPANIES_LOCATION,
    payload: location,
  };
};
export const filterCompaniesByCategorie = (categorie) => {
  return {
    type: FILTER_COMPANIES_CATEGORIE,
    payload: categorie,
  };
};
export const filterCompaniesBySubcategorie = (subcategorie) => {
  return {
    type: FILTER_COMPANIES_SUBCATEGORIE,
    payload: subcategorie,
  };
};


export const setAccessToken = (token) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: token,
    };
};

export const setUserData = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};


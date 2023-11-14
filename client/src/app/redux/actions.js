export const GET_ALL_COMPANIES = "GET_ALL_COMPANIES";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const FILTER_COMPANIES = "FILTER_COMPANIES";
export const FILTER_COMPANIES_LOCATION = "FILTER_COMPANIES_LOCATION";
export const FILTER_COMPANIES_CATEGORIE = "FILTER_COMPANIES_CATEGORIE";
export const FILTER_COMPANIES_SUBCATEGORIE = "FILTER_COMPANIES_SUBCATEGORIE";
export const GET_ALL_TENDERS = "GET_ALL_TENDERS";
export const FILTER_TENDERS = "FILTER_TENDERS";
export const FILTER_TENDERS_LOCATION = "FILTER_TENDERS_LOCATION";
export const FILTER_TENDERS_CATEGORIE = "FILTER_TENDERS_CATEGORIE";
export const FILTER_TENDERS_SUBCATEGORIE = "FILTER_TENDERS_SUBCATEGORIE";
export const FILTER_COMPANIES_COMPANY = "FILTER_COMPANIES_COMPANY";

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

export const filterCompaniesByCompanyId = (companyId) => {
  return {
    type: FILTER_COMPANIES_COMPANY,
    payload: companyId,
  };
};


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

export const setAllTenders = () => {
  return {
    type: GET_ALL_TENDERS,
    payload: tenders,
  };
};

export const filterTenderByName = (name) => {
  return {
    type: FILTER_TENDERS,
    payload: name,
  };
};
export const fiterTendersByLocation = (location) => {
  return {
    type: FILTER_TENDERS_LOCATION,
    payload: location,
  };
};
export const filterTendersByCategorie = (categorie) => {
  return {
    type: FILTER_TENDERS_CATEGORIE,
    payload: categorie,
  };
};
export const filterTendersBySubcategorie = (subcategorie) => {
  return {
    type: FILTER_TENDERS_SUBCATEGORIE,
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


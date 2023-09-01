export const GET_ALL_COMPANIES = "GET_ALL_COMPANIES";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// const desarrolloApp = "http://localhost:3001";

export const setAllCompanies = () => {
  return {
    type: GET_ALL_COMPANIES, 
    payload: companies 
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


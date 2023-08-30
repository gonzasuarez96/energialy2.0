import axios from 'axios';

export const GET_ALL_COMPANIES = "GET_ALL_COMPANIES";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

const desarrolloApp = "http://localhost:3001";

export const getAllCompanies = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/companies`)
            const companies = response.data.data
            dispatch({ type: GET_ALL_COMPANIES, payload: companies})
        } catch (error) {
            console.log(error)
        }
    }
}

export const setAccessToken = (token) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: token,
    };
};


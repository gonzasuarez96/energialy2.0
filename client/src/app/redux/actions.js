import axios from 'axios';

export const GET_ALL_COMPANIES = "GET_ALL_COMPANIES";

const desarrolloApp = "http://localhost:3001";
let companies = [];

export const getAllCompanies = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/companies`)
            companies = response.data.data
            dispatch({ type: GET_ALL_COMPANIES, payload: companies})
        } catch (error) {
            console.log(error)
        }
    }
}


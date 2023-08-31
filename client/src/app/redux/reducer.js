import {
    GET_ALL_COMPANIES,
    SET_ACCESS_TOKEN,
    LOGIN_SUCCESS
} from './actions';

//Global states
const initialState = {
    companies: [],
    accessToken: null,
    user: [{login:false,}],
}

//Reducer function
export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        //Guarda toda la informacion en el estado global
        case GET_ALL_COMPANIES:
            return {
                ...state,
                companies: payload
            }
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                 accessToken: payload, // Actualiza el token de acceso en el estado
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: payload
            }

        default:
            return {
                ...state,
            }
    }
}
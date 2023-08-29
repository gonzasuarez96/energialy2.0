import {
    GET_ALL_COMPANIES
} from './actions';

//Global states
const initialState = {
    companies: [],
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

    }
}
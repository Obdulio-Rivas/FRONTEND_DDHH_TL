import { types } from "../Types/types";

const loginAction ={

}

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }
        case types.logout:
            return{
                logged: false
            }
        default:
            return state;
    }
}
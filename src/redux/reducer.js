import * as constans from './constants'
const initialState = {
    notification: <></>
}



const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case constans.ACTION_NOTIFICATION_SUCSESS:
            return { ...state, notification: action.data }
        case constans.ACTION_NOTIFICATION_FAILURE:
            return { ...state, notification: action.data }
        default:
            return state
    }
}
export default rootReducer
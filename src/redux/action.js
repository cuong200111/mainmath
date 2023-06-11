import * as constans from './constants'
export const actionNoti = (data) => ({
    type: constans.ACTION_NOTIFICATION,
    data: {
        varirant: data.varirant,
        msg: data.msg
    }
})
export const actionNoti_sucsess = (data) => ({
    type: constans.ACTION_NOTIFICATION_SUCSESS,
    data: data
})
export const actionNoti_failure = (data) => ({
    type: constans.ACTION_NOTIFICATION_FAILURE,
    data: data
})
import { call, put, takeLatest } from 'redux-saga/effects'
import * as React from 'react';
import * as actions from './action'
import * as constants from './constants'
import MuiAlert from '@mui/material/Alert'
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function* actionsNoti(action) {
    const { data } = action

    if (data.varirant === 'error' || data.varirant === 'warning' || data.varirant === 'success') {
        if (data.varirant === 'error') {
            yield put(actions.actionNoti_sucsess(<><Alert severity="error">{data.msg}</Alert></>))
        } else if (data.varirant === 'warning') {

            yield put(actions.actionNoti_sucsess(<Alert severity="warning">{data.msg}</Alert>))
        } else if (data.varirant === 'success') {

            yield put(actions.actionNoti_sucsess(<><Alert severity="success">{data.msg}</Alert></>))
        }
    } else {
        yield put(actions.actionNoti_failure())

    }
}

export default function* rootSaga() {
    yield takeLatest(constants.ACTION_NOTIFICATION, actionsNoti)
}
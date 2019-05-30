import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';


function* saveRun( action ) {
    try {
        console.log('in save run saga', action.payload);        
        yield axios.post( `/api/runs/saveDetails`, action.payload );
        yield put({ type: 'GET_SELECTED_MISSIONS' });
        yield put({ type: 'GET_SELECTED_EITHER_OR' });
    }
    catch(error) {
        console.log(`Couldn't post your run details`, error);
        alert(`Sorry, couldn't save your run details`);
    }
}


function* getSelectedPenalties( action ) {
    try {
        const response = yield axios.get(`/api/runs/penalties`);
        yield put({ type: 'SET_SELECTED_PENALTIES', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get penalties info`);
    }
}

function* updateRunDetails( action ){
    try{
        yield axios.post(`api/runs/updateDetails`, action.payload)
    } catch (error) {
        console.log(`Couldn't update your run details`);
    }
}

function* runSaga() {
    yield takeLatest( 'SAVE_RUN_DETAILS', saveRun );
    yield takeLatest( 'GET_SELECTED_PENALTIES', getSelectedPenalties);
    yield takeLatest( 'UPDATE_RUN_DETAILS', updateRunDetails );
}

export default runSaga;
import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

// Getting coach's teams by the user id
function* saveRun(action) {
    try {
        console.log('in save run saga', action.payload);        
        yield axios.post( `/api/runs/saveDetails`, action.payload );
        
    }
    catch(error) {
        console.log(`Couldn't post your run details`, error);
        alert(`Sorry, couldn't save your run details`);
    }
}

function* runSaga() {
    yield takeLatest( 'SAVE_RUN_DETAILS', saveRun );
}

export default runSaga;
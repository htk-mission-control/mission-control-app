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

// // Getting coach's teams by the team id
// function* saveRunWithId(action) {
//     try {
//         console.log('in save run with id saga', action.payload);
//         console.log('in save run action.payload2', action.payload);
//         yield axios.post( `/api/runs/saveDetailsCoach`, action.payload );
//     }
//     catch (error) {
//         console.log(`Couldn't post your run details`, error);
//         alert(`Sorry, couldn't save your run details`);
//     }
// }

function* runSaga() {
    yield takeLatest( 'SAVE_RUN_DETAILS', saveRun );
    // yield takeLatest( 'SAVE_RUN_DETAILS_WITH_ID', saveRunWithId );
}

export default runSaga;
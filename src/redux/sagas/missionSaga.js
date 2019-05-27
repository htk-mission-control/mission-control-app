import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getMissions( action ) {    
    try {
        const response = yield axios.get( `/api/runs/missions` );
        console.log( `get response is`, response.data );
        yield put({ type: 'SET_ALL_MISSIONS', payload: response.data })
    }
    catch( error ) {
        console.log( `Couldn't get missions from db` );
    }
}

function* getSelectedMissions( action ) {
    try {
        const response = yield axios.get( `/api/runs/selectedMissions` )
        console.log(`get response is`, response.data)
        yield put({ type: 'SET_SELECTED_MISSIONS', payload: response.data })
    }
    catch( error ) {
        console.log( `Couldn't get selected missions from db` );
    }
}

// function* getSelectedMissionsWithId( action ) {
//     try {
//         const response = yield axios.get(`/api/runs/selectedMissions/${action.payload.teamId}`)
//         console.log(`get response is`, response.data)
//         yield put({ type: 'SET_SELECTED_MISSIONS', payload: response.data })
//     }
//     catch (error) {
//         console.log(`Couldn't get selected missions from db`);
//     }
// }

function* missionSaga() {
    yield takeLatest( 'GET_ALL_MISSIONS', getMissions );
    yield takeLatest( 'GET_SELECTED_MISSIONS', getSelectedMissions );
    // yield takeLatest( 'GET_SELECTED_MISSIONS_WITH_ID', getSelectedMissionsWithId );
}

export default missionSaga;
import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getMissions( action ) {    
    try {
        const response = yield axios.get(`/api/runs/missions`);
        console.log(`get response is`, response.data);
        yield put({ type: 'SET_ALL_MISSIONS', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get missions from DB`);
    }
}

function* getGoalTypes( action ) {
    try {
        const response = yield axios.get( `/api/projects/goalTypes`);
        yield put( {type: 'SET_GOAL_TYPES', payload: response.data} );
    }
    catch(error) {
        console.log( `Couldn't get goal types.`, error );
        alert( `Sorry, can't get data at this time. Try again later.` );
    }
}

function* addMission( action ){
    try {
        // console.log( `in addMission!` );
        yield axios.post( '/api/projects/mission', action.payload );
    }
    catch(error) {
        console.log( `Couldn't save mission.`, error );
        alert( `Sorry, couldn't save mission at this time. Try again later.` );
    }
}

function* getMissionDetails( action ){
    try{
        const response = yield axios.get( `api/projects/mission/${action.payload}` );
        yield put( {type: `SET_MISSION_DETAILS`, payload: response.data.missionGoals} );
        yield put( {type: 'SET_GOAL_OPTIONS', payload: response.data.eitherOrOptions} );
    }
    catch(error) {
        console.log( `Couldn't get mission details.`, error );
        alert( `Sorry, could not get info at this time. Try again later.` );
    }
} 

function* updateMission( action ) {
    try{
        yield axios.put( `/api/projects/mission`, action.payload );
    }
    catch(error) {
        console.log( `Couldn't update mission details.`, error );
        alert( `Sorry, could not update info at this time. Try again later.` );
    }
}

function* missionSaga() {
    yield takeLatest('GET_ALL_MISSIONS', getMissions);
    yield takeLatest( 'GET_GOAL_TYPES', getGoalTypes );
    yield takeLatest( 'ADD_MISSION', addMission );
    yield takeLatest( 'GET_MISSION_DETAILS', getMissionDetails );
    yield takeLatest( 'UPDATE_MISSION', updateMission );
}

export default missionSaga;
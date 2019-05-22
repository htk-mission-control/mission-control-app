import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

// Getting coach's teams by the user id
function* getAllTeams(action) {
    try {
        console.log( action.payload );
        const response = yield axios.get( `/api/teams/${action.payload}` );
        yield put( {type: 'SET_ALL_TEAMS', payload: response.data} );
    }
    catch(error) {
        console.log(`Couldn't get teams by coach id.`, error);
        alert(`Sorry, couldn't get teams. Try again later.`);
    }
}

// Updating team_access between true/false
function* updateTeamAccess(action) {
    try {
        console.log( action.payload );
        yield axios.put( `/api/teams`, action.payload );
        yield put( {type: 'GET_ALL_TEAMS', payload: action.payload.coachId} );
    }
    catch(error) {
        console.log(`Couldn't update team access.`, error);
        alert(`Sorry, couldn't update team access. Try again later.`);
    }
}

function* teamSaga() {
    yield takeLatest( 'GET_ALL_TEAMS', getAllTeams );
    yield takeLatest( 'UPDATE_TEAM_ACCESS', updateTeamAccess );
}

export default teamSaga;
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
        console.log(`Couldn't get teams by coach id`);
        alert(`Sorry, couldn't get teams. Try again later.`);
    }
}

function* teamSaga() {
    yield takeLatest( 'GET_ALL_TEAMS', getAllTeams );
}

export default teamSaga;
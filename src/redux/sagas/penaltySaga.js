import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* addPenalty(action) {
    try {
        yield axios.post( `/api/projects/penalty`, action.payload );
    }
    catch(error) {
        console.log( `Couldn't add penalty.`, error );
        alert( `Sorry, couldn't add penalty at this time. Try again later.` );
    }
}

function* penaltySaga() {
    yield takeLatest( `ADD_PENALTY`, addPenalty );
}

export default penaltySaga;
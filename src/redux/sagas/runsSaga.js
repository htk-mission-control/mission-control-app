import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getRunsAsCoach( action ) {    
    try {
        const response = yield axios.get(`/api/runs/coach`);
        console.log(`get response is`, response.data);
        yield put({ type: 'SET_RUNS', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get runs from DB`, error);
    }
}

function* getRunsAsTeam( action ) {    
    try {
        const response = yield axios.get(`/api/runs/team`);
        console.log(`get response is`, response.data);
        yield put({ type: 'SET_RUNS', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get runs from DB`, error);
    }
}

function* runsSaga() {
    yield takeLatest('GET_RUNS_AS_COACH', getRunsAsCoach);
    yield takeLatest('GET_RUNS_AS_TEAM', getRunsAsTeam);
}

export default runsSaga;

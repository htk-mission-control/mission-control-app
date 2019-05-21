import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getProjects(action) {    
    try {
        const response = yield axios.get(`/api/projects`);
        yield put({ type: 'SET_PROJECTS', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get project info`);
    }
}

function* projectSaga() {
    yield takeLatest('GET_ALL_PROJECTS', getProjects);
}

export default projectSaga;
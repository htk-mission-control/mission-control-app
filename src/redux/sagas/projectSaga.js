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

function* addProject(action) {
    try {
        yield axios.post(`/api/projects`, action.payload);
        yield put({ type: 'GET_ALL_PROJECTS' })
    }
    catch (error) {
        console.log(`Couldn't get project info`);
    }
}

function* projectSaga() {
    yield takeLatest('GET_ALL_PROJECTS', getProjects);
    yield takeLatest('ADD_PROJECT', addProject);
}

export default projectSaga;
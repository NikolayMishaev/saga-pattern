import {
  takeEvery,
  put,
  call,
  fork,
  select,
  join,
  spawn,
} from "redux-saga/effects";

async function swapiGet(par) {
  const request = await fetch(`https://swapi.dev/api/${par}`);
  const data = await request.json();
  return data.results;
}

export function* loadPlanets() {
  const planet = yield call(swapiGet, "planets");
  yield put({ type: "SET_PLANETS", payload: planet });
  console.log("load planets");
  return planet;
}

export function* loadPeople() {
  const people = yield call(swapiGet, "people");
  yield put({ type: "SET_PEOPLE", payload: people });
  console.log("load people");
}

export function* workerSaga() {
  const task = yield fork(loadPlanets);
  yield spawn(loadPeople);

  const people = yield join(task);
  console.log("finish");
  const store = yield select((s) => s);
  console.log(store);
}

export function* watchClickSaga() {
  yield takeEvery("ACTION", workerSaga);
}

export default function* rootSaga() {
  yield watchClickSaga();
}

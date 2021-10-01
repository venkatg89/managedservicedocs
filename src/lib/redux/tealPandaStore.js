import { applyMiddleware, createStore, combineReducers } from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import initialState from './initialState';

class ReducerRegistry {
    _reducers = {};

    constructor() {
        this._emitChange = null;
    }

    getReducers() {
        return this._reducers && { ...this._reducers };
    }

    register(nameSpace, name, reducer) {
        if (this._reducers[nameSpace]) {
            this._reducers[nameSpace].add(name, reducer);
        } else {
            this._reducers = { ...this._reducers || {}, [nameSpace]: extendibleReducer(nameSpace, name, reducer) };
        }

        if (this._emitChange)
            this._emitChange(this.getReducers());
    }

    setChangeListener(listener) {
        this._emitChange = listener;
    }
}

const extendibleReducer = (nameSpace, name, func) => {
    let _reducers = { [name]: func };

    const extReducer = (state, action) => {
        if(!_reducers[action.type]) {
            return { ...state };
        }
        let newState = _reducers[action.type] && _reducers[action.type](state, action);
        return { ...state, ...newState };
    }

    extReducer.add = (newName, newFunc) => {
        _reducers[newName] = newFunc;
    }

    return extReducer;
}

const reducerRegistry = new ReducerRegistry();

const registerAction = (name, reducerFunction) => {
    const nameSpace = name.substring(0, name.indexOf('/'));

    reducerRegistry.register(nameSpace, name, reducerFunction);
}

const combine = (reducers) => {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach(item => {
        if (reducerNames.indexOf(item) === -1) {
            reducers[item] = (state = null) => state;
        }
    });
    return combineReducers(reducers);
};

const middleware = applyMiddleware(promise, logger);

const reducer = reducerRegistry.getReducers() ? combine(reducerRegistry.getReducers()) : state => state;
const tealPandaStore = createStore(reducer, initialState, middleware);

reducerRegistry.setChangeListener(reducers => {
    tealPandaStore.replaceReducer(combine(reducers));
});

export { tealPandaStore, registerAction };

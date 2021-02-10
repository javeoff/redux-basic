import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' 
import { async_increment, changeTheme, decrement, increment } from './redux/actions'
import { rootReducer } from './redux/rootReducer'
import './style.css'

function logger(state) {
    return function(next) {
        return function(action) {
            console.log(state.getState());
            const newState = next(action)
            console.log(newState);
            return newState
        }
    }
}

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk, logger)
    )
window.store = store

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')

const themeBtn = document.getElementById('theme')

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(async_increment())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light'
    store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
    const state = store.getState()

    counter.textContent = state.counter.toString()
    document.body.className = state.theme.value
})

store.dispatch({type: 'INIT_APPLICATION'})
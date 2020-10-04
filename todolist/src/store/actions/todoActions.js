import { TODOS_LOADING_START, GET_TODOS, TODOS_LOADING_STOP, ADD_TOKEN } from '../types';
import { db, messaging } from '../../config/firebase';

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp({
//     apiKey: "AIzaSyDAhPBoGnff-8dEkWDG1yxa_0_LfqrszVI",
//    authDomain: "todolist-f813a.firebaseapp.com",
//    databaseURL: "https://todolist-f813a.firebaseio.com",
//    projectId: "todolist-f813a",
//    storageBucket: "todolist-f813a.appspot.com",
//    messagingSenderId: "800553814905",
//    appId: "1:800553814905:web:e9635325e64710d3f3bda8",
//    measurementId: "G-KYTQ6YFP6Z"
// })

export const getTodos = () => async dispatch => {
    try {
        dispatch({
            type: TODOS_LOADING_START
        });


        db.ref('todos').on('value', snap => {
            if (snap.exists) {
                let todos = [];
                snap.forEach((todo, index) => {
                    let data = todo.val()
                    todos.push({
                        ...data,
                        id: todo.key
                    })
                })
                dispatch({
                    type: GET_TODOS,
                    payload: todos
                })
            }
        })

    } catch (error) {
        dispatch({
            type: TODOS_LOADING_STOP
        });
        alert(error.message);
    }
}

export const addTodo = (todo) => async dispatch => {
    try {
        await db.ref('todos').push({
            ...todo,
            createAt: Date.now()
        });
    } catch (error) {
        alert(error.message)
    }
}

export const editTodo = (todo) => async dispatch => {
    try {
        await db.ref(`todos/${todo.id}`).update({
            ...todo,
            editedAt: Date.now()
        });
    } catch (error) {
        alert(error.message);
    }
}

export const deleteTodo = (id) => async dispatch => {
    try {
        await db.ref(`todos/${id}`).remove();
        // dispatch(notifications());
    } catch (error) {
        alert(error.message);
    }
}

export const subscribeToNotifications = () => async (dispatch, getState) => {
    try {
        let state = getState();
        let id = state.auth.user.id;
        await messaging.requestPermission();
        let token = await messaging.getToken();

        db.ref(`tokens/${id}`).set(token);

        dispatch({
            type: ADD_TOKEN,
            payload: token
        });
    } catch (error) {
        console.log(error);
    }
}

// export const notifications = () => async (dispatch, getState) => {
//     try {
//         let snap = await db.ref('tokens').once('value');

//         const payload = {
//             notification: {
//                 title: 'Deleted',
//                 body: "Todo deleted"
//             }
//         }

//         const tokens = [];
//         for (let key in snap) {
//             tokens.push(snap[key]);
//         }

//         admin.messaging().sendToDevice(tokens, payload);

//     } catch (error) {

//     }
// }
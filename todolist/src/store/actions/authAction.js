import { SIGN_UP, SIGN_IN, AUTH_LOADING_START, AUTH_LOADING_STOP } from '../types';
import { db, auth } from '../../config/firebase';

export const checkAuth = (history) => async dispatch => {
    auth.onAuthStateChanged(user => {
        if (user) {
            db.ref(`users/${user.uid}`).once('value', snap => {
                let data = snap.val();
                dispatch({
                    type: SIGN_UP,
                    payload: {
                        ...data,
                        id: user.uid
                    }
                });
                history.push('/');
            });
        }
    });
}

export const signUp = (data, history) => async dispatch => {
    try {
        dispatch({
            type: AUTH_LOADING_START
        });

        let res = await auth.createUserWithEmailAndPassword(data.email, data.password);
        await db.ref(`users/${res.user.uid}`).set(data);
        dispatch({
            type: SIGN_UP,
            payload: {
                ...data,
                id: res.user.uid
            }
        });
        history.push('/');
    } catch (error) {
        dispatch({
            type: AUTH_LOADING_STOP
        })
        alert(error.message);
    }
}

export const signIn = (data, history) => async dispatch => {
    try {
        dispatch({
            type: AUTH_LOADING_START
        });

        let res = await auth.signInWithEmailAndPassword(data.email, data.password);
        let uid = res.user.uid;
        db.ref(`users/${uid}`).once('value', snap => {
            let data = snap.val();
            dispatch({
                type: SIGN_UP,
                payload: {
                    ...data,
                    id: uid
                }
            });
            history.push('/');
        })
    } catch (error) {
        dispatch({
            type: AUTH_LOADING_STOP
        })
        alert(error.message);
    }
}


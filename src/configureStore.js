import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import rootSaga from './sagas'

export default function configureStore (history) {
    const sagaMiddleware = createSagaMiddleware()

    const middleware = [sagaMiddleware]

    const store = createStore(
        rootReducer,
        {},
        compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f // Redux devtools
        )
    )

    sagaMiddleware.run(rootSaga)

    return store
}

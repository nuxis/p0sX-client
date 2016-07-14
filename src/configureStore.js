import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import rootSaga from './sagas'

/* const initialState = {
   items: new List(),
   ingredients: new List(),
   cart: new List(),
   selectedCategory: 0,
   categories: new List([Map({
   id: 0,
   name: 'All'
   })]),
   currentItem: Map({
   id: 0,
   ingredients: new List()
   })
   } */

// TODO: Write these functions as reselect SELECTORS!
/* const getCurrentItem = () => {
   return store.getState().currentItem
   }

   const getItemById = (id) => {
   var state = store.getState()
   var item = {}
   state.items.forEach((i) => {
   if (i.get('id') === id) {
   item = i
   }
   })
   return item
   }

   const getIngredientById = (id) => {
   var f = {}
   var state = store.getState()
   state.ingredients.forEach((i) => {
   if (i.get('id') === id) {
   f = i
   }
   })
   return f
   } */

/*
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

const history = syncHistoryWithStore(createMemoryHistory(), store)

export default store
export {
    history
} */

export default function configureStore (history) {
    const reactRouterReduxMiddleware = routerMiddleware(history)
    const sagaMiddleware = createSagaMiddleware()

    const middleware = [sagaMiddleware, reactRouterReduxMiddleware]

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

import { createStore } from 'vuex'

export default createStore({
    state: {
        dishes: [
            {name: 'Lasagne', ingredients: []},
            {name: 'Chili con Carne', ingredients: []},
            {name: 'Pizza', ingredients: []},
            {name: 'Apfel', ingredients: []},
            {name: 'Wraps', ingredients: []},
            {name: 'Nudelauflauf', ingredients: []},
        ]
    },
    getters: {
        dishes(state) {
            return state.dishes
        }
    },
    actions: {
        addDish(store, payload) {
            store.commit('addDish', payload)
        },

        removeDish(store, payload) {
            store.commit('removeDish', payload)
        },

        setDish(store, payload) {
            store.commit('setDish', payload)
        },
    },
    mutations: {
        addDish(state, data) {
            state.dishes.push(data)
        },

        removeDish(state, data) {
            state.dishes.splice(state.dishes.findIndex(e => e.name === data), 1)
        },

        setDish(state, data) {
            state.dishes[state.dishes.findIndex(e => e.name === data.name)] = data
        },
    },
    modules: {
    }
})

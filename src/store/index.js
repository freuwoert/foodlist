import { createStore } from 'vuex'

export default createStore({
    state: {
        dishes: [
            {name: 'Lasagne', ingredients: [{name: 'niggastangen'}]},
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
        setDish(store, payload) {
            store.commit('setDish', payload)
        },

        removeDish(store, payload) {
            store.commit('removeDish', payload)
        },
    },
    mutations: {
        setDish(state, data) {
            let i = state.dishes.findIndex(e => e.name === data.name)

            if (i < 0) state.dishes.push(data)
            else       state.dishes[i] = data
        },

        removeDish(state, data) {
            state.dishes.splice(state.dishes.findIndex(e => e.name === data), 1)
        },
    },
    modules: {
    }
})

<template>
    <div class="view-container">
        <p v-for="(dish, i) in dishes" :key="i">
            {{dish.name}}
            <ui-icon-button @v-click="openIngredientEditor(dish)">&#984043;</ui-icon-button>
            <ui-icon-button error @v-click="removeDish(dish)">&#985721;</ui-icon-button>
        </p>
        <p>
            <ui-text-input label="Gericht" v-model="nameInput"></ui-text-input>
        </p>
        <p>
            <ui-button icon="&#984085;" @v-click="addDish(nameInput)">Gericht hinzufügen</ui-button>
        </p>

        <div v-if="editedDish !== null">
            <p v-for="(ingredient, j) in editedDish.ingredients" :key="j">
                {{ingredient.name}}
                <ui-icon-button error @v-click="removeIngredient(j)">&#985721;</ui-icon-button>
            </p>
            <p>
                <ui-text-input label="Zutat" v-model="ingredientInput"></ui-text-input>
            </p>
            <p>
                <ui-button icon="&#984085;" @v-click="addIngredient(ingredientInput)">Zutat hinzufügen</ui-button>
            </p>
            <p>
                <ui-button icon="&#983443;" @v-click="saveEditedDish()">Gericht speichern</ui-button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
        name: 'Dishes',

        data() {
            return {
                nameInput: '',
                ingredientInput: '',
                editedDish: null,
            }
        },

        mounted() {
        },

        methods: {
            addDish(dish) {
                this.$store.dispatch('addDish', {name: dish, ingredients: []})
                this.nameInput = ''
            },

            removeDish(dish) {
                this.$store.dispatch('removeDish', dish.name)
            },

            openIngredientEditor(dish) {
                this.ingredientEditor = true
                this.editedDish = dish
            },

            addIngredient(ingredient)
            {
                this.editedDish.ingredients.push({name: ingredient})
                this.ingredientInput = ''
            },

            removeIngredient(index)
            {
                this.editedDish.ingredients.splice(index, 1)
            },

            saveEditedDish()
            {
                this.$store.dispatch('setDish', this.editedDish)
            }
        },

        computed: {
            dishes() {
                return this.$store.getters.dishes
            }
        },

        components: {
        }
    }
</script>
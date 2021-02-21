<template>
    <div class="view-container">
        <transition-group name="slide">
            <div class="dish" v-for="dish in dishes" :key="dish.name" @click="openEditor(dish)">
                <span class="dish-content">
                    <div class="title">{{dish.name}}</div>
                    <div class="ingredients" v-show="dish.ingredients.length > 0">{{dish.ingredients.map(e => e.name).join(', ')}}</div>
                </span>
                <ui-icon-button class="delete-button" error @click.stop @v-click="removeDish(dish)">&#985721;</ui-icon-button>
            </div>
        </transition-group>

        <div class="placeholder" v-if="dishes.length == 0">
            Keine Gerichte gespeichert!
        </div>

        <div class="fab" @click="openEditor()">&#984085;</div>

        <transition class="transition" name="slide-up" :duration="250">
            <div class="slideup" v-if="editedDish !== null">
                <div class="slideup-background" @click="closeEditor()"></div>
                <div class="slideup-container">
                    <div class="padding">
                        <ui-text-input class="dish-input" label="Name des Gerichtes" v-model="editedDish.name"></ui-text-input>

                        <div class="ingredient-input-wrapper">
                            <ui-text-input class="ingredient-input" label="Zutat" v-model="ingredientInput" @enter="addIngredient($event)"></ui-text-input>
                            <ui-icon-button class="ingredient-button" solid @v-click="addIngredient(ingredientInput)">&#984085;</ui-icon-button>
                        </div>

                        <div class="ingredient-wrapper" v-show="editedDish.ingredients.length > 0">
                            <div class="ingredient" v-for="(ingredient, j) in editedDish.ingredients" :key="j">
                                <div class="title">{{ingredient.name}}</div>
                                <ui-icon-button class="delete-button" error @click.stop @v-click="removeIngredient(j)">&#985721;</ui-icon-button>
                            </div>
                        </div>
                    </div>
                    <div class="button-container">
                        <ui-button icon="none" light @v-click="closeEditor()">Abbrechen</ui-button>
                        <ui-button class="save-button" icon="none" @v-click="save()">speichern</ui-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
        name: 'Dishes',

        data() {
            return {
                editedDish: null,
                ingredientInput: '',
            }
        },

        mounted() {
        },

        methods: {
            removeDish(dish) {
                this.$store.dispatch('removeDish', dish.name)
            },

            openEditor(dish = {name: '', ingredients: []}) {
                this.editedDish = JSON.parse(JSON.stringify(dish))
            },

            closeEditor() {
                this.editedDish = null
            },

            addIngredient(ingredient)
            {
                if (!ingredient.trim()) return
                this.editedDish.ingredients.push({name: ingredient})
                this.ingredientInput = ''
                this.$forceUpdate()
            },

            removeIngredient(index)
            {
                this.editedDish.ingredients.splice(index, 1)
            },

            save()
            {
                this.$store.dispatch('setDish', this.editedDish)
                this.editedDish = null
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

<style lang="sass" scoped>
    .transition
        display: content

    .placeholder
        height: 100%
        width: 100%
        display: grid
        place-content: center
        color: var(--text-gray)
        position: absolute
        top: 0
        left: 0

    .dish
        width: 100%
        margin-bottom: 0
        padding: 0 10px 0 15px
        display: flex
        align-items: center
        border-bottom: var(--border)
        transition: all 150ms ease-in-out

        &.slide-enter-from
            transform: translateX(-100px)
            opacity: 0

        &.slide-leave-to
            transform: scale(0)
            opacity: 0

        .dish-content
            flex: 1
            padding: 15px 0

            .title
                font-size: 16px
                color: var(--heading-gray)
                font-weight: 600
                display: block

            .ingredients
                font-size: var(--text-size)
                color: var(--text-gray)
                display: block

    .fab
        height: 54px
        width: 54px
        border-radius: 54px
        display: grid
        place-content: center
        font-family: 'Material Icons'
        font-size: 26px
        background: var(--primary)
        color: white
        filter: var(--elevation-4)
        position: fixed
        bottom: 15px
        right: 15px
        
    .slideup
        position: fixed
        top: 0
        left: 0
        height: 100%
        width: 100%
        z-index: 2000

        .slideup-background
            position: absolute
            top: 0
            left: 0
            height: 100%
            width: 100%
            background: #00000040
            transition: all 250ms

        .slideup-container
            border-radius: 15px 15px 0 0
            position: absolute
            bottom: 0
            left: 0
            max-height: 100%
            width: 100%
            background: var(--bg)
            transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1)

            .padding
                padding: 15px
                padding-bottom: 0

                .dish-input
                    margin-bottom: 15px

                .ingredient-wrapper
                    width: 100%
                    margin-bottom: 13px
                    max-height: 200px
                    border-radius: 5px
                    overflow: auto
                    border: var(--input-border)

                    .ingredient
                        width: 100%
                        padding: 0
                        padding-left: 15px
                        display: inline-flex
                        align-items: center
                        border-bottom: var(--border)
                        height: 40px
                        transition: all 150ms ease-in-out

                        &:last-of-type
                            border-color: transparent

                        &.slide-enter-from
                            transform: translateX(-100px)
                            opacity: 0

                        &.slide-leave-to
                            transform: scale(0)
                            opacity: 0

                        .title
                            flex: 1
                            font-size: 16px
                            color: var(--heading-gray)
                            font-weight: 600
                            display: block

                .ingredient-input-wrapper
                    width: 100%
                    height: 50px
                    position: relative
                    margin-bottom: 15px

                    .ingredient-button
                        position: absolute
                        top: 5px
                        right: 5px
                        background: var(--primary)
                        color: white

                    .ingredient-input
                        padding-right: 35px

            .button-container
                padding: 15px
                background: var(--bg-dark)
                width: 100%

                .save-button
                    float: right

        &.slide-up-enter-from,
        &.slide-up-leave-to
            .slideup-background
                background: transparent

            .slideup-container
                transform: translateY(100%)
</style>
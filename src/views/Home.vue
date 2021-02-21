<template>
    <div class="view-container">
        <div class="card-wrapper" v-if="randomDish">
            <div class="card-container">
                <img src="../assets/placeholder.svg">
                <h1>{{randomDish.name}}</h1>
                <p v-if="randomDish.ingredients.length > 0">{{randomDish.ingredients.map(e => e.name).join(', ')}}</p>
            </div>
        </div>

        <div class="placeholder" v-else>
            Füge dein erstes Gericht hinzu.<br><br>
            <ui-button @v-click="$router.push('dishes')">Jetzt Hinzufügen</ui-button>
        </div>

        <div class="button-wrapper" v-if="randomDish">
            <ui-button icon="none" @v-click="chooseRandomDish()">Zufälliges Gericht</ui-button>
        </div>
    </div>
</template>

<script>
    // import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',

        data() {
            return {
                randomDish: null,
            }
        },

        mounted() {
            this.chooseRandomDish()
        },

        methods: {
            chooseRandomDish() {
                if (this.dishes.length == 0)
                {
                    return
                }

                if (this.randomDish === null)
                {
                    this.randomDish = this.dishes[0]
                }

                let oldDish = this.randomDish.name

                while (this.dishes.length > 1 && this.randomDish.name == oldDish) 
                {
                    let randomDishIndex = Math.floor(Math.random() * (this.dishes.length))
    
                    this.randomDish = this.dishes[randomDishIndex]
                }
            }
        },

        computed: {
            dishes() {
                return this.$store.getters.dishes
            }
        },

        components: {
            // HelloWorld,
        }
    }
</script>

<style lang="sass" scoped>
    .view-container
        display: grid
        grid-template: auto 60px / 1fr
        grid-template-areas: "wrapper" "button"

        .placeholder
            height: 100%
            width: 100%
            display: grid
            place-content: center
            color: var(--text-gray)
            position: absolute
            top: 0
            left: 0

        .card-wrapper
            grid-area: wrapper
            display: grid
            place-content: center

            .card-container
                max-width: 320px
                border-radius: 7px
                background: var(--bg)
                filter: var(--elevation-2)
                font-size: 0

                img
                    width: 100%
                    height: 180px
                    object-fit: cover
                    border-radius: 7px 7px 0 0

                h1
                    font-size: 25px
                    line-height: 40px
                    width: 100%
                    text-align: center
                    padding: 0 15px

                p
                    font-size: var(--text-size)
                    color: var(--text-gray)
                    width: 100%
                    text-align: center
                    padding: 0 15px
                    margin-top: 0

        .button-wrapper
            grid-area: button
            text-align: center
</style>

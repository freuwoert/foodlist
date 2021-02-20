<template>
    <div class="view-container">
        <div class="card-wrapper">
            <div class="card-container">
                <img src="https://www.kuechengoetter.de/uploads/media/1800x1200/02/4282-pizza-margherita.jpg?v=1-0">
                <h1>{{randomDish.name}}</h1>
            </div>
        </div>

        <div class="button-wrapper">
            <ui-button icon="&#984221;" @v-click="chooseRandomDish()">Mischen</ui-button>

        </div>
    </div>
</template>

<script>
    // import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',

        data() {
            return {
                randomDish: '',
                
            }
        },

        mounted() {
            this.chooseRandomDish()
        },

        methods: {
            chooseRandomDish() {
                let randomDishIndex = Math.floor(Math.random() * (this.dishes.length))

                this.randomDish = this.dishes[randomDishIndex]
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
        height: 100%
        display: grid
        grid-template: auto 60px / 1fr
        grid-template-areas: "wrapper" "button"

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

        .button-wrapper
            grid-area: button
</style>

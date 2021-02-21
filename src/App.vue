<template>
    <div id="nav">
        <router-link class="home-link" to="/">&#988191;</router-link>
        <router-link class="dishes-link" to="/dishes">&#984211;</router-link>
    </div>
    <router-view class="router-view" v-slot="{ Component }">
        <transition :name="($route.path == '/') ? 'slide-left' : 'slide-right'">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style lang="sass">
    @font-face
        font-family: "Material Icons"
        src: url("./fonts/mdi/materialdesignicons-webfont.eot?v=5.7.55")
        src: url("./fonts/mdi/materialdesignicons-webfont.eot?#iefix&v=5.7.55") format("embedded-opentype"), url("./fonts/mdi/materialdesignicons-webfont.woff2?v=5.7.55") format("woff2"), url("./fonts/mdi/materialdesignicons-webfont.woff?v=5.7.55") format("woff"), url("./fonts/mdi/materialdesignicons-webfont.ttf?v=5.7.55") format("truetype")
        font-weight: normal
        font-style: normal
    
    html
        --border: 1px solid #ccc
        --input-border: 1px solid #ccc
        --focused-input-border: 1px solid #666

        --elevation-1: drop-shadow(0 1px 1px #00000037)
        --elevation-2: drop-shadow(0 3px 2px #00000030)
        --elevation-4: drop-shadow(0 4px 6px #00000020)

        --text-font: 'Roboto', sans-serif
        --heading-font: sofia-pro, sans-serif
        --text-size: 15px
        --button-size: 14px
        --bg: #ffffff
        --bg-dark: #f4f4f4
        --primary: #6c5ce7
        --primary-shade: #6c5ce718
        --primary-shine: #6c5ce740
        --heading-gray: #2F3542
        --text-gray: #666F79
        --text-gray-shade: #666F7910
        --secondary: #34E7E4
        --secondary-shade: #34E7E430
        --success: #2ecc71
        --success-shade: #2ecc7115
        --warning: #ffc400
        --warning-shade: #ffc40020
        --error: #ff4757
        --error-shade: #ff475710

    *
        display: inline-block
        box-sizing: border-box

        &:focus
            outline: none

    body, html
        display: block
        font-size: 0
        margin: 0
        padding: 0
        height: 100%

    script, link, head, style, title
        display: none

    p
        display: block

    #app
        font-family: 'Roboto', sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50
        width: 100%
        height: 100%
        position: relative

    #nav
        position: fixed
        top: 0
        left: 0
        z-index: 1000
        width: 100%
        height: 50px
        padding: 0 5px
        background: var(--bg)
        font-size: var(--text-size)
        text-align: left

        a
            color: var(--text-gray)
            text-decoration: none
            font-family: 'Material Icons'
            font-size: 25px
            height: 50px
            width: 50px
            display: inline-grid
            place-content: center

            &.dishes-link
                float: right

            &.router-link-exact-active
                color: var(--primary)

    .view-container
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        z-index: 3000
        height: calc(100% - 50px)
        text-align: left
        font-size: var(--text-size)

    .router-view
        transition: all 200ms

        &.slide-right-enter-from,
        &.slide-left-leave-to
            transform: translateX(100%)

        &.slide-left-enter-from,
        &.slide-right-leave-to
            transform: translateX(-100%)
</style>

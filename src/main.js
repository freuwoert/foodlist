import Vue, { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UiButton from './components/ui/UiButton.vue'
import UiIconButton from './components/ui/UiIconButton.vue'
import UiTextInput from './components/ui/UiTextInput.vue'
import UiNumberInput from './components/ui/UiNumberInput.vue'

const app = createApp(App).use(store).use(router)

app.component('ui-button', UiButton)
app.component('ui-icon-button', UiIconButton)
app.component('ui-text-input', UiTextInput)
app.component('ui-number-input', UiNumberInput)

app.config.devtools = true
app.config.performace = true

app.mount('#app')


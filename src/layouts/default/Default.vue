<template>
    <v-app
        v-touch="{
            left: () => swipe('Left'),
            right: () => swipe('Right'),
            up: () => swipe('Up'),
            down: () => swipe('Down'),
        }"
    >
        <default-bar />
        <div class="ma-4 h-100">
            <default-view class="h-100" />
        </div>
        <v-bottom-navigation :elevation="6" grow :active="activeNavigateBottom">
            <v-btn @click="$router.push({ name: 'Home' })">
                <v-icon>mdi-home</v-icon>
                Home
            </v-btn>

            <v-btn value="favorites">
                <v-icon>mdi-heart</v-icon>

                อนาคต
            </v-btn>

            <v-btn value="nearby">
                <v-icon>mdi-map-marker</v-icon>

                อนาคต
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeNavigateBottom = ref(true)
function swipe(direction: string) {
    if (direction === 'Up') {
        activeNavigateBottom.value = true
    } else if (direction === 'Down') {
        activeNavigateBottom.value = false
    }
}
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>

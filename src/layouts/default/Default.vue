<template>
    <v-app>
        <default-bar />
        <div class="ma-4 h-100">
            <default-view class="h-100" />
        </div>
        <!-- <v-bottom-navigation :elevation="6" grow :active="activeNavigateBottom">
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
        </v-bottom-navigation> -->
    </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNavigateBottom = ref(true)

import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>
<style scoped lang="scss">
.v-dialog {
    position: absolute;
    bottom: 0;
    right: 0;
}
.v-overlay__content {
    margin: 0px;
}
.dialog-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: auto;
}
.my-custom-dialog {
    align-self: flex-end;
}
</style>

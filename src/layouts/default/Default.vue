<template>
    <v-app>
        <default-bar />
        <div class="ma-4 h-100">
            <default-view class="h-100" />
        </div>
        <v-bottom-navigation :elevation="6" grow :active="true">
            <v-btn @click="$router.back()">
                <v-icon>mdi-arrow-left</v-icon>
                Back
            </v-btn>

            <v-btn @click="$router.push({ name: 'HomePage' })">
                <v-icon>mdi-home</v-icon>
                Home
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script lang="ts" setup>
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

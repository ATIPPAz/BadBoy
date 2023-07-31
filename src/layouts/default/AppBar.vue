<template>
    <v-app-bar color="primary" density="compact" prominent>
        <template v-slot:prepend>
            <!-- <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon> -->
        </template>

        <v-app-bar-title>BadBoy</v-app-bar-title>
    </v-app-bar>
    <!-- <v-navigation-drawer v-model="drawer" location="left" temporary>
        <v-list :items="items"></v-list>
    </v-navigation-drawer> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

<template>
    <v-app-bar
        color="primary"
        density="compact"
        prominent
        class="rounded-b-lg elevation-0"
    >
        <template v-slot:prepend>
            <!-- <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon> -->
        </template>

        <v-app-bar-title>
            <span style="font-weight: bold"> BadBoy </span>
        </v-app-bar-title>
    </v-app-bar>
    <!-- <v-navigation-drawer v-model="drawer" location="left" temporary>
        <v-list :items="items"></v-list>
    </v-navigation-drawer> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

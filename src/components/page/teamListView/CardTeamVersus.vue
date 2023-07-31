<template>
    <v-card>
        <template v-slot:title>
            <div class="d-flex align-center">
                <span> Court {{ props.courtNumber }} </span>
                <v-spacer></v-spacer>
                <div v-if="!openCard" class="d-flex my-2">
                    <div class="d-flex justify-center">
                        <span class="blue-team mr-6">
                            {{ props.teamA.score }}
                        </span>
                        <span style="font-size: 20px"> VS </span>
                        <span class="red-team ml-6">
                            {{ props.teamB.score }}</span
                        >
                    </div>
                </div>
                <v-spacer></v-spacer>
                <v-icon
                    @click="openCard = !openCard"
                    :style="{ transform: openCard ? '' : 'scaleY(-1)' }"
                >
                    mdi-chevron-up
                </v-icon>
            </div>
            <v-divider
                v-if="openCard"
                :thickness="1"
                class="mb-4 mt-2 border-opacity-100"
            ></v-divider>
        </template>
        <template v-slot:text v-if="openCard">
            <div class="text-versus d-flex align-center justify-space-around">
                <span class="blue-team">
                    {{ props.teamA.score }}
                </span>
                <span style="font-size: 36px"> VS </span>
                <span class="red-team"> {{ props.teamB.score }}</span>
            </div>
        </template>
        <template v-slot:subtitle>
            <div
                class="d-flex align-center justify-space-between"
                v-if="openCard"
            >
                <span class="d-flex justify-center" style="width: 33.33%">{{
                    props.teamA.name
                }}</span>
                <span style="width: 33.33%"></span>
                <span class="d-flex justify-center" style="width: 33.33%">
                    {{ props.teamB.name }}
                </span>
            </div>
        </template>
        <v-card-actions v-if="openCard">
            <v-spacer></v-spacer>
            <v-btn @click="$router.push({ name: 'CounterVuew' })">Go</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
interface Team {
    score: number
    name: string
}
import { ref } from 'vue'
const props = defineProps<{ courtNumber: number; teamA: Team; teamB: Team }>()
const openCard = ref(true)
</script>
<style scoped lang="scss">
.text-versus {
    font-size: 48px;
    font-weight: bold;
}
.blue-team {
    color: blue;
}
.red-team {
    color: red;
}
</style>

<template>
    <v-card>
        <template v-slot:title>
            Court {{ props.courtNumber }}
            <v-divider
                :thickness="1"
                class="mb-4 mt-2 border-opacity-100"
            ></v-divider>
        </template>
        <template v-slot:text>
            <div class="text-versus d-flex align-center justify-space-around">
                <span class="blue-team">
                    {{ props.teamA.score }}
                </span>
                <span style="font-size: 36px"> VS </span>
                <span class="red-team"> {{ props.teamB.score }}</span>
            </div>
        </template>
        <template v-slot:subtitle>
            <div class="d-flex align-center justify-space-between">
                <span class="justify-center">{{ props.teamA.name }}</span>
                <span></span>
                <span> {{ props.teamB.name }} </span>
            </div>
        </template>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>Go</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
interface Team {
    score: number
    name: string
}
const props = defineProps<{ courtNumber: number; teamA: Team; teamB: Team }>()
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

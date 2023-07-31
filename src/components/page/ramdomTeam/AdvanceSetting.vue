<template>
    <div>
        <div class="mt-2">
            <!-- <br /> -->
            <!-- <div class="d-flex justify-space-between bg-green">
                <div
                    class="rounded-s-lg d-flex align-center justify-center"
                    style="width: 40px"
                >
                    <v-icon
                        @click="emits('update:teamLimit', props.teamLimit + 1)"
                    >
                        mdi-chevron-down
                    </v-icon>
                </div>
                <input type="number" value="1" readonly style="height: 35px" />
                <div>
                    <v-icon
                        @click="emits('update:teamLimit', props.teamLimit + 1)"
                    >
                        mdi-chevron-up
                    </v-icon>
                </div>
            </div>

            <br /> -->
            <span class="ml-10">จำนวนคนในทีม</span>
            <v-text-field
                density="compact"
                :rules="rules"
                :value="props.teamLimit"
                readonly
            >
                <template v-slot:append>
                    <v-icon
                        color="green"
                        @click="emits('update:teamLimit', props.teamLimit + 1)"
                    >
                        mdi-plus
                    </v-icon>
                </template>
                <template v-slot:prepend>
                    <v-icon
                        color="red"
                        @click="
                            () => {
                                if (props.teamLimit > 1)
                                    emits(
                                        'update:teamLimit',
                                        props.teamLimit - 1
                                    )
                            }
                        "
                    >
                        mdi-minus
                    </v-icon>
                </template>
                <template v-slot:details style="display: none"> </template>
            </v-text-field>
        </div>
        <div class="mt-2">
            <span class="ml-10">จำนวนคอร์ท</span>
            <v-text-field
                :rules="rules"
                readonly
                density="compact"
                :value="props.courtNumber"
            >
                <template v-slot:details>
                    <div style="display: none"></div>
                </template>
                <template v-slot:append>
                    <v-icon
                        color="green"
                        @click="
                            emits('update:courtNumber', props.courtNumber + 1)
                        "
                    >
                        mdi-plus
                    </v-icon>
                </template>
                <template v-slot:prepend>
                    <v-icon
                        color="red"
                        @click="
                            () => {
                                if (props.courtNumber > 1)
                                    emits(
                                        'update:courtNumber',
                                        props.courtNumber - 1
                                    )
                            }
                        "
                    >
                        mdi-minus
                    </v-icon>
                </template>
            </v-text-field>
        </div>
        <div class="mt-2">
            <span class="ml-10">ชนะติดต่อกัน</span>
            <v-text-field
                :rules="rules"
                readonly
                :value="props.winStreak"
                density="compact"
            >
                <template v-slot:append>
                    <v-icon
                        color="green"
                        @click="emits('update:winStreak', props.winStreak + 1)"
                    >
                        mdi-plus
                    </v-icon>
                </template>
                <template v-slot:prepend>
                    <v-icon
                        color="red"
                        @click="
                            () => {
                                if (props.winStreak > 1)
                                    emits(
                                        'update:winStreak',
                                        props.winStreak - 1
                                    )
                            }
                        "
                    >
                        mdi-minus
                    </v-icon>
                </template>
            </v-text-field>
        </div>
        <div class="mt-2">
            <span class="ml-10">เเต้มชนะ</span>
            <v-text-field
                density="compact"
                :rules="rules"
                :value="winScore"
                readonly
            >
                <template v-slot:append>
                    <v-icon
                        color="green"
                        @click="
                            () => {
                                if (winScoreIndex >= listScoreGame.length - 1)
                                    return
                                hasChange = true
                                winScoreIndex += 1
                                emits('update:winScore', winScore)
                            }
                        "
                    >
                        mdi-chevron-right
                    </v-icon>
                </template>
                <template v-slot:prepend>
                    <v-icon
                        style="transform: scaleX(-1)"
                        color="red"
                        @click="
                            () => {
                                if (winScoreIndex < 1) return
                                winScoreIndex -= 1
                                hasChange = true
                                emits('update:winScore', winScore)
                            }
                        "
                    >
                        mdi-chevron-right
                    </v-icon>
                </template>
            </v-text-field>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

const listScoreGame = [11, 15, 21]
const winScoreIndex = ref(1)
const hasChange = ref(false)
const winScore = computed(() => {
    return !hasChange.value &&
        !isNaN(parseInt(localStorage.getItem('winScore') ?? ''))
        ? parseInt(localStorage.getItem('winScore')!)
        : listScoreGame[winScoreIndex.value]
})
const rules = [
    (value: number) => !!value || 'Required.',
    (value: number) => value > 0 || 'not zero',
]
const props = withDefaults(
    defineProps<{
        courtNumber: number
        winStreak: number
        teamLimit: number
    }>(),
    {
        courtNumber: 1,
        teamLimit: 2,
        winStreak: 2,
        winScore: 15,
    }
)
const emits = defineEmits<{
    (e: 'update:courtNumber', value: number): void
    (e: 'update:teamLimit', value: number): void
    (e: 'update:winStreak', value: number): void
    (e: 'update:winScore', value: number): void
}>()
</script>
<style scoped lang="scss">
::v-deep(.v-input__details) {
    display: none;
}
</style>

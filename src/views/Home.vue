<template>
    <v-container class="h-100 pa-0 ma-0">
        <v-row no-gutters class="h-100">
            <v-col align-self="start" cols="12">
                <v-textarea
                    label="กรอกรายชื่อทีม"
                    v-model="textTeam"
                ></v-textarea>
                <div class="d-flex justify-end mb-4">
                    <v-btn @click="showAdvanceSetting = !showAdvanceSetting">
                        {{ wordAdvanceSetting }} การตั้งค่าเพิ่มเติม
                    </v-btn>
                </div>
                <div v-if="showAdvanceSetting">
                    <TeamAdvanceSetting
                        v-model:court-number="courtNumber"
                        v-model:team-limit="teamLimit"
                        v-model:win-streak="winStreak"
                        @update:win-score="(e:number)=>{
                            winScore=e
                        }"
                    />
                </div>
            </v-col>
            <v-col align-self="end" cols="12">
                <div class="d-flex justify-end">
                    <v-btn @click="randomTeam">สุ่มทีม</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTeamStore } from '@/store/team'

import { useCourtStore } from '@/store/court'
import TeamAdvanceSetting from '@/components/page/ramdomTeam/AdvanceSetting.vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
const wordAdvanceSetting = computed(() =>
    showAdvanceSetting.value ? 'ปิด' : 'เปิด'
)
const showAdvanceSetting = ref(false)
const { setTeamLimit, addTeamMember, resetTeam } = useTeamStore()
const { setCourtNumber, setWinScore, setWinStreak } = useCourtStore()
const courtNumber = ref(1)
const winStreak = ref(2)
const teamLimit = ref(2)
const winScore = ref(15)

const textTeam = ref(localStorage.getItem('textTeam') ?? '')
const member = ref<string[]>([])
function generateMember() {
    return textTeam.value.split('\n').length > 0
        ? textTeam.value.split('\n')
        : []
}
function shufferMember(member: string[]) {
    for (let i = member.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[member[i], member[j]] = [member[j], member[i]]
    }
    return member
}
function randomTeam() {
    member.value = generateMember()
    if (member.value.length <= 0) {
        return
    }
    localStorage.setItem('textTeam', textTeam.value)
    setCourtNumber(courtNumber.value)
    resetTeam()
    setTeamLimit(teamLimit.value)
    setWinScore(winScore.value)
    setWinStreak(winStreak.value)
    member.value = shufferMember(member.value)
    member.value.forEach((player) => {
        addTeamMember(player)
    })
    router.push({ name: 'TeamView' })
}
</script>
<style scoped lang="scss">
.v-container {
    max-width: 100%;
}
</style>

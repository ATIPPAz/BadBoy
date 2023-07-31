<template>
    <div
        class="h-100"
        style="position: relative"
        v-touch="{
            left: () => swipe('Left'),
            right: () => swipe('Right'),
            up: () => swipe('Up'),
            down: () => swipe('Down'),
        }"
    >
        <div class="content h-100" style="position: relative">
            <div>
                0 player <br />
                0 court
                <!-- <div
                    style="
                        position: absolute;
                        bottom: 0px;
                        height: 20px;
                        background-color: rgb(223, 219, 255);
                        width: 100%;
                        border-radius: 10px 10px 0px 0px;
                    "
                    class="d-flex justify-center"
                >
                    <div>
                        <div class="d-flex justify-center">
                            <div>
                                <v-divider
                                    :thickness="3"
                                    class="border-opacity-100"
                                    color="primary"
                                    style="margin-bottom: 2px; width: 20px"
                                ></v-divider>
                            </div>
                        </div>

                        <div class="d-flex justify-center">
                            <v-divider
                                :thickness="3"
                                class="border-opacity-100"
                                color="primary"
                                style="margin-bottom: 2px; width: 40px"
                            ></v-divider>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="d-flex justify-center align-center h-100 background">
            <div>
                <div class="d-flex justify-center align-center">
                    <img src="./../assets/swipe-up.svg" alt="swipe up" />
                </div>
                <div class="d-flex justify-center align-center swipe-word">
                    swipe up to random
                </div>
            </div>
        </div>
    </div>
    <v-dialog
        persistent
        v-model="isActive"
        transition="dialog-bottom-transition"
        :fullscreen="true"
    >
        <v-card class="w-100" style="border-radius: 10px 10px 0px 0px">
            <template v-slot:title>
                <div class="d-flex justify-space-between">
                    <span>Random Badminton Team</span>
                    <v-icon variant="text" @click="isActive = false">
                        mdi-close
                    </v-icon>
                </div>
                <div class="d-flex justify-center">
                    <div>
                        <v-divider
                            :thickness="5"
                            class="border-opacity-100 mt-4"
                            color="primary"
                            style="width: 150px; border-radius: 30px"
                        ></v-divider>
                    </div>
                </div>
            </template>
            <v-container class="h-100 pa-6 ma-0">
                <v-row no-gutters class="h-100">
                    <v-col align-self="start" cols="12">
                        <div style="color: #838383; margin-bottom: 12px">
                            List of team members
                        </div>

                        <textarea v-model="textTeam"></textarea>
                        <div class="d-flex justify-space-between my-2">
                            <div
                                style="font-size: 12px; color: #838383"
                                class="d-flex align-center"
                            >
                                <div v-if="!showAdvanceSetting">
                                    ตั้งค่าเพิ่มเติมที่ปุ่มข้างๆ
                                </div>
                            </div>
                            <div
                                @click="
                                    showAdvanceSetting = !showAdvanceSetting
                                "
                            >
                                <span class="text-primary"
                                    >Advance Settings</span
                                >
                                <span>
                                    <v-icon
                                        color="primary"
                                        :style="{
                                            transform: showAdvanceSetting
                                                ? ''
                                                : 'scaleY(-1)',
                                        }"
                                    >
                                        mdi-chevron-up
                                    </v-icon>
                                </span>
                            </div>
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
                    <v-col align-self="end" cols="12" class="">
                        <div class="w-100"></div>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions class="d-flex justify-end w-100 pa-4">
                <div class="w-100">
                    <v-btn
                        class="w-100 bg-primary text-white mx-0 mb-2"
                        rounded="xl"
                        @click="randomTeam"
                    >
                        random
                    </v-btn>
                    <v-btn
                        class="w-100 text-primary mx-0"
                        style="background-color: #f1f2ff"
                        rounded="xl"
                        @click="resetTextTeam"
                    >
                        reset
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-btn
        style="position: fixed; bottom: 16px; right: 16px"
        v-if="!isActive && !$vuetify.display.mobile"
        @click="isActive = true"
    >
        สร้างทีม
    </v-btn>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useTeamStore } from '@/store/team'

import { useCourtStore } from '@/store/court'
import TeamAdvanceSetting from '@/components/page/ramdomTeam/AdvanceSetting.vue'
import router from '@/router'
const isActive = ref(false)
function swipe(direction: string) {
    if (direction === 'Up') {
        isActive.value = true
    }
}
const showAdvanceSetting = ref(false)
const { setTeamLimit, addTeamMember, resetTeam } = useTeamStore()
const { setCourtNumber, setWinScore, setWinStreak } = useCourtStore()

const courtNumber = ref(
    isNaN(parseInt(localStorage.getItem('courtNumber') ?? ''))
        ? 1
        : parseInt(localStorage.getItem('courtNumber')!)
)
const winStreak = ref(
    isNaN(parseInt(localStorage.getItem('winStreak') ?? ''))
        ? 2
        : parseInt(localStorage.getItem('winStreak')!)
)
const teamLimit = ref(
    isNaN(parseInt(localStorage.getItem('teamLimit') ?? ''))
        ? 2
        : parseInt(localStorage.getItem('teamLimit')!)
)
const winScore = ref(
    isNaN(parseInt(localStorage.getItem('winScore') ?? ''))
        ? 15
        : parseInt(localStorage.getItem('winScore')!)
)

const textTeam = ref(localStorage.getItem('textTeam') ?? '')
const member = ref<string[]>([])
function generateMember() {
    return textTeam.value.split('\n').length > 0
        ? textTeam.value.trim().split('\n')
        : []
}
function shufferMember(member: string[]) {
    for (let i = member.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[member[i], member[j]] = [member[j], member[i]]
    }
    return member
}
function resetTextTeam() {
    localStorage.removeItem('textTeam')
    localStorage.removeItem('courtNumber')
    localStorage.removeItem('winScore')
    localStorage.removeItem('winStreak')
    localStorage.removeItem('teamLimit')
    textTeam.value = ''
    courtNumber.value = 1
    winScore.value = 15
    winStreak.value = 2
    teamLimit.value = 2
}
function randomTeam() {
    if (textTeam.value.trim() === '') {
        alert('ใส่ชื่อผู้เล่นด้วย')
        return
    }
    member.value = generateMember()
    const splitTeam = Math.ceil(member.value.length / teamLimit.value!)
    if (splitTeam < courtNumber.value! * 2) {
        alert(
            `ใส่จำนวนคนไม่พอ ขั้นต่ำ ${
                courtNumber.value * 2 * teamLimit.value
            } คน`
        )
        return
    }
    showAdvanceSetting.value = false
    isActive.value = false
    localStorage.setItem('textTeam', textTeam.value)
    localStorage.setItem('courtNumber', courtNumber.value.toString())
    localStorage.setItem('winScore', winScore.value.toString())
    localStorage.setItem('winStreak', winStreak.value.toString())
    localStorage.setItem('teamLimit', teamLimit.value.toString())
    setCourtNumber(courtNumber.value)
    resetTeam()
    setTeamLimit(teamLimit.value)
    setWinScore(winScore.value)
    setWinStreak(winStreak.value)
    member.value = shufferMember(member.value)
    // member.value.forEach((player) => {
    //     addTeamMember(player)
    // })
    // router.push({ name: 'TeamView' })
}
</script>
<style scoped lang="scss">
textarea {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 1px solid #c0c0c0;
    border-radius: 12px;
    background-color: #f1f2ff;
    font-size: 16px;
    resize: none;
}
textarea:focus {
    outline: none !important;
    border: 1px solid #7378db;
    box-shadow: 0 0 10px #eeeeee;
}
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
.swipe {
    position: fixed;
    z-index: 120;
    top: 20px;
    left: 20px;
    width: 100%;
    height: 100%;
}
.content {
    position: relative;
    z-index: 100;
}
.swipe-word {
    color: #d1d4ff;
    font-size: 30px;
    font-weight: bold;
}
</style>

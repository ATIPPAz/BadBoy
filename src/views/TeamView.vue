<template>
    <div class="h-100">
        <div class="mb-2">ทีมปัจจุบัน</div>
        <div>
            <CardVersus
                v-for="(team, index) in court"
                class="mb-6"
                :court-number="index + 1"
                :team-a="{name:getTeamQueue((index*2)+1)!.member.join(' '),score:team.scoreTeamA}"
                :team-b="{name:getTeamQueue((index+1)*2)!.member.join(' '),score:team.scoreTeamB}"
            />
        </div>
        <div v-if="teamRemain.length > 0">
            <div class="mb-2">ทีมต่อไป</div>
            <div>
                <v-card v-for="team in getRemainQueue()" class="mb-2">
                    <template v-slot:text>
                        team: {{ team.member.join(' , ') }}
                    </template>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTeamStore } from '@/store/team'
import { storeToRefs } from 'pinia'
import { useCourtStore } from '@/store/court'
import CardVersus from '@/components/page/teamListView/CardTeamVersus.vue'
import { computed } from 'vue'
import { onMounted } from 'vue'
import router from '@/router'
const { getTeamQueue, getRemainQueue } = useTeamStore()
const { court } = storeToRefs(useCourtStore())
const teamRemain = computed(() => getRemainQueue())
onMounted(() => {
    if (!court.value) {
        router.push({ name: 'Home' })
    }
})
</script>

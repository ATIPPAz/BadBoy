<template>
    <div>
        <CardVersus
            v-for="(team, index) in court"
            class="mb-6"
            :court-number="index + 1"
            :team-a="{name:getTeamQueue(index+1)!.member.join(' '),score:team.scoreTeamA}"
            :team-b="{name:getTeamQueue(index+2)!.member.join(' '),score:team.scoreTeamB}"
        />
        <div v-if="teamRemain.length > 0">
            ทีมต่อไป
            <v-card v-for="team in getRemainQueue()">
                <template v-slot:text>
                    team: {{ team.member.join(' ') }}
                </template>
            </v-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTeamStore } from '@/store/team'
import { storeToRefs } from 'pinia'
import { useCourtStore } from '@/store/court'
import CardVersus from '@/components/page/teamListView/CardTeamVersus.vue'
import { computed } from 'vue'
const { getTeamQueue, getRemainQueue } = useTeamStore()
const { court } = storeToRefs(useCourtStore())
const teamRemain = computed(() => getRemainQueue())
</script>

<template>
    <div>
        <CardVersus
            v-for="(team, index) in court"
            class="mb-6"
            :court-number="index + 1"
            :team-a="{name:getTeamQueue(index+1)!.member.join(' '),score:team.scoreTeamA}"
            :team-b="{name:getTeamQueue(index+2)!.member.join(' '),score:team.scoreTeamB}"
        />
    </div>
</template>

<script setup lang="ts">
import { useTeamStore } from '@/store/team'
import { storeToRefs } from 'pinia'
import { useCourtStore } from '@/store/court'
import CardVersus from '@/components/page/teamListView/CardTeamVersus.vue'
const { getTeamQueue } = useTeamStore()
const { court } = storeToRefs(useCourtStore())
</script>

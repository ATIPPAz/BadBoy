<template>
    <div class="h-100">
        <div class="mb-2" style="font-size: 20px; font-weight: bold">
            ทีมปัจจุบัน
        </div>

        <div>
            <CardVersus
                v-for="(team, index) in court"
                class="mb-4"
                :court-number="index + 1"
                :team-a="{ score: team.scoreTeamA }"
                :team-b="{ score: team.scoreTeamB }"
            >
                <template #teamA>
                    team
                    {{ teams[index][0].order }}
                    <div
                        v-for="member in teams[index][0].member"
                        class="trunt-word"
                    >
                        {{ member }}
                    </div>
                </template>
                <template #teamB>
                    team
                    {{ teams[index][1].order }}
                    <div
                        v-for="member in teams[index][1].member"
                        class="trunt-word"
                    >
                        {{ member }}
                    </div>
                </template>
            </CardVersus>
        </div>
        <div v-if="teamRemain.length > 0">
            <div class="mb-2" style="font-size: 20px; font-weight: bold">
                ทีมต่อไป
            </div>
            <div>
                <v-card
                    v-for="team in teamStore.getRemainQueue()"
                    class="mb-2"
                    elevation="0"
                    style="
                        border-radius: 8px;
                        border: 1px solid rgb(203, 203, 203);
                    "
                >
                    <template v-slot:text>
                        team {{ team.order }} : {{ team.member.join(' , ') }}
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
import { computed, onMounted, ref, inject } from 'vue'
import { pageStatePluginSymbol } from '@/plugins/pageState'
import router from '@/router'
const pageState = inject(pageStatePluginSymbol)!
const teamStore = useTeamStore()
const { court } = storeToRefs(useCourtStore())
const teamRemain = computed(() => teamStore.getRemainQueue())
const teams = ref<any>([])
court.value?.forEach((e, index) => {
    const merge = []
    const dataA = teamStore.getTeamQueue(index * 2 + 1)
    merge.push(dataA)
    const dataB = teamStore.getTeamQueue((index + 1) * 2)
    merge.push(dataB)
    teams.value.push(merge)
})
onMounted(() => {
    if (!court.value) {
        router.push({ name: 'HomePage' })
    } else {
        pageState.setCreateRoomTeam()
    }
})
</script>
<style scoped lang="scss">
.trunt-word {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

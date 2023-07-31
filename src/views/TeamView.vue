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
                    team {{ getTeamQueue(index * 2 + 1)?.order }}
                    <div
                        v-for="member in getTeamQueue((index*2)+1)!.member"
                        class="trunt-word"
                    >
                        {{ member }}
                    </div>
                </template>
                <template #teamB>
                    team {{ getTeamQueue((index + 1) * 2)?.order }}
                    <div
                        v-for="member in getTeamQueue((index+1)*2)!.member"
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
                    v-for="team in getRemainQueue()"
                    class="mb-2"
                    elevation="0"
                    style="
                        border-radius: 8px;
                        border: 1px solid rgb(203, 203, 203);
                    "
                >
                    <template v-slot:text>
                        team{{ team.order }} : {{ team.member.join(' , ') }}
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
const { getTeamQueue, getRemainQueue } = useTeamStore()
const { court } = storeToRefs(useCourtStore())
const teamRemain = computed(() => getRemainQueue())
</script>
<style scoped lang="scss">
.trunt-word {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

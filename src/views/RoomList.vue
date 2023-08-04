<template>
    <div class="h-100" style="position: relative">
        <div
            class="px-4"
            style="
                position: fixed;
                top: 50px;
                right: 0px;
                z-index: 1000;
                width: calc(100vw);
                background-color: #fafbfd;
            "
        >
            <v-text-field
                variant="underlined"
                v-model="search"
                placeholder="search room"
            ></v-text-field>
        </div>
        <div class="mt-12">
            <div v-if="data.length > 0">
                <v-card
                    v-for="i in data"
                    class="my-4"
                    @click="
                        $router.push({
                            name: 'TeamListPage',
                            params: {
                                roomId: i._id,
                            },
                        })
                    "
                >
                    <v-card-title>{{ i.roomData.roomName }}</v-card-title>
                    <v-card-text>
                        <div class="d-flex" style="overflow-x: hidden">
                            <span
                                class="d-flex"
                                v-for="(n, nIndex) in i.roomData.allTeam"
                            >
                                {{ n.member.join(' , ') }}
                            </span>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div v-else>NoData</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
const data = computed(() =>
    _data.value.filter(
        (e: any) => !search.value || e.roomData.roomName.includes(search.value)
    )
)
const _data = ref<any>([])
const search = ref('')
onMounted(async () => {
    _data.value = await fetch('https://bad-boy-service.vercel.app/room').then(
        (e) => e.json()
    )
    console.log(_data.value)
})
</script>

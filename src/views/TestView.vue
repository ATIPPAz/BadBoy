<template>
    {{ pollingTest }}
</template>
<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'
import { pollingPluginSymbol } from '@/plugins/pollingEvent'
import { onUnmounted } from 'vue'
const pollingTest = ref('test polling Data')
const polling = inject(pollingPluginSymbol)!
function updateValue(e: any) {
    console.log(e)
    pollingTest.value = e
}
onMounted(async () => {
    console.log('craete')

    polling.addEventListening(updateValue)
    polling.startConection()
    setTimeout(() => {
        console.log('timeout')
        polling.endConnection(() => {
            pollingTest.value = 'stop pulling test'
        })
    }, 60000)
})
onUnmounted(() => {
    polling.endConnection()
})
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Toolbar from './ToolBar.vue';

const algoOptions = ['BubleSort'] as const
type AlgoOptions = typeof algoOptions[number]

const chosenAlgo = ref<AlgoOptions>('BubleSort')
const errorText = ref('')
const array = ref<number[]>([])
const numberOfItems = 100
const min = 10
const max = 50
const shouldStop = ref(false)
const currentId = ref<number>(-1)
const finished = ref(false)

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function bubbleSort() {
    let steps = 0
    for (const _ of array.value) {
        for (let i = 0; i < array.value.length - 1; i++) {
            currentId.value = i + 1
            if (shouldStop.value) return
            if (array.value[i] > array.value[i + 1]) {
                const tmp = array.value[i]
                array.value[i] = array.value[i + 1]
                array.value[i + 1] = tmp
            }
            steps++
            if (steps % 10 === 0) await new Promise(requestAnimationFrame)
        }
    }
}

async function start() {
    shouldStop.value = false
    await bubbleSort()
    finished.value = true
}

function reset() {
    currentId.value = -1
    shouldStop.value = true
    finished.value = false
    array.value = generateData()
}

function generateData() {
    return Array.from({ length: numberOfItems }, () => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    })
}

onMounted(() => {
    array.value = generateData()
})

</script>

<template>
    <div
        class="motion-preset-focus-lg h-full overflow-hidden flex items-center justify-center mask-b-from-80% mask-b-to-100%">
        <div class="flex gap-1 items-end w-full" :key="currentId">
            <div v-for="(val, index) in array"
                :class="index == currentId ? 'bg-red-500' : finished ? 'bg-red-500' : 'bg-zinc-500'" :key="index"
                :style="{
                    height: `${val * 10}px`,
                    width: `${100 / numberOfItems}%`
                }"></div>
        </div>
    </div>
    <Toolbar>
        <div class="flex flex-col gap-2">
            <p v-if="errorText" class="text-red-600 absolute -top-8 right-0 left-0 text-center">{{ errorText }}</p>
            <div class="flex w-full gap-2 justify-center">
                <button class="bg-zinc-950 hover:bg-zinc-950/70 rounded-lg text-zinc-200 px-4 py-1" @click="start">
                    ▶ Start
                </button>
                <button class="bg-zinc-950 hover:bg-zinc-950/70 rounded-lg text-zinc-200 px-4 py-1" @click="reset">
                    Reset
                </button>
            </div>
        </div>
    </Toolbar>
</template>
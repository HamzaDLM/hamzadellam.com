<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Toolbar from './ToolBar.vue';

const cellSize = 20
const rows = ref(0)
const cols = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const updateInterval = 700
let updateTimeout: number
const pauseInterval = 2000
let pauseTimeout: number
const grid = ref<number[][]>([])

function createGrid(random = false): number[][] {
    return Array.from({ length: rows.value }, () =>
        Array.from({ length: cols.value }, () => (random ? Math.round(Math.random()) : 0))
    )
}

const calculateGrid = () => {
    if (containerRef.value) {
        const size = containerRef.value.clientWidth
        const count = Math.floor(size / cellSize)
        rows.value = count
        cols.value = count
    }
}

function toggleCell(x: number, y: number) {
    grid.value[y][x] = grid.value[y][x] ? 0 : 1
    pauseTemporarily()
}

function getNextGeneration(current: number[][]): number[][] {
    const next = createGrid()

    for (let y = 0; y < rows.value; y++) {
        for (let x = 0; x < cols.value; x++) {
            const neighbors = countNeighbors(current, x, y)
            const alive = current[y][x] === 1

            if (alive && (neighbors === 2 || neighbors === 3)) next[y][x] = 1
            else if (!alive && neighbors === 3) next[y][x] = 1
        }
    }

    return next
}

function countNeighbors(grid: number[][], x: number, y: number): number {
    let count = 0
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue
            const nx = x + dx
            const ny = y + dy
            if (nx >= 0 && nx < cols.value && ny >= 0 && ny < rows.value) {
                count += grid[ny][nx]
            }
        }
    }
    return count
}

function startInterval() {
    clearInterval(updateTimeout)
    updateTimeout = setInterval(() => {
        grid.value = getNextGeneration(grid.value)
    }, updateInterval)
}

function pauseTemporarily() {
    clearInterval(updateTimeout)
    clearTimeout(pauseTimeout)
    pauseTimeout = setTimeout(() => {
        startInterval()
    }, pauseInterval)
}

function refresh() {
    clearInterval(updateTimeout)
    calculateGrid()
    grid.value = createGrid(true)
    startInterval()
}

onMounted(() => {
    calculateGrid()
    grid.value = createGrid(true)
    startInterval()
})

onBeforeUnmount(() => {
    clearInterval(updateTimeout)
})
</script>

<template>
    <div class="motion-preset-focus-lg h-full select-none overflow-hidden flex items-center justify-center mask-fade-between">
        <div ref="containerRef" class="w-full aspect-square border-y-2 border-zinc-600/20 overflow-hidden">
            <div class="grid w-full" :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }">
                <template v-for="(row, y) in grid" :key="y">
                    <div v-for="(cell, x) in row" :key="`${y}-${x}`" @click="toggleCell(x, y)"
                        class="aspect-square w-full cursor-crosshair border border-dotted border-zinc-900"
                        :class="cell ? 'bg-red-500' : ''"></div>
                </template>
            </div>
        </div>
    </div>
    <Toolbar>
        <div class="flex gap-2">
            <button class="text-zinc-200 px-2 py-1 rounded-lg" @click="refresh">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                    viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                    <path fill="currentColor"
                        d="M4.654 19.346v-1H7.75l-1.054-1.042q-1.165-1.131-1.68-2.481q-.516-1.35-.516-2.734q0-2.41 1.374-4.361T9.5 4.942v1.062q-1.82.765-2.91 2.424t-1.09 3.66q0 1.222.464 2.37q.463 1.15 1.44 2.127l1.019 1.019v-3.027h1v4.77zm9.846-.288v-1.062q1.82-.765 2.91-2.424t1.09-3.66q0-1.222-.463-2.37q-.464-1.15-1.44-2.126l-1.02-1.02v3.027h-1v-4.77h4.77v1H16.25l1.054 1.043q1.148 1.148 1.672 2.49q.524 1.341.524 2.726q0 2.41-1.374 4.36T14.5 19.058" />
                </svg>
            </button>
            <!-- <div class="bg-zinc-950 rounded-lg">
                <button class=" px-2 py-1 " @click="rows += 1">
                    +
                </button>
                Rows
                <button class="bg-zinc-950 px-2 py-1 rounded-lg" @click="refresh">
                    -
                </button>
            </div>
            <div class="bg-zinc-950 rounded-lg">
                <button class=" px-2 py-1 " @click="rows += 1">
                    +
                </button>
                Cols
                <button class="bg-zinc-950 px-2 py-1 rounded-lg" @click="refresh">
                    -
                </button>
            </div> -->
        </div>
    </Toolbar>
</template>

<style scoped>
.grid {
    display: grid;
}
</style>

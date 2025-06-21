<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const rows = 50
const cols = 100
let updateInterval = 700
let updateTimeout: number
let pauseInterval = 2000
let pauseTimeout: number
const grid = ref<number[][]>([])

function createGrid(random = false): number[][] {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (random ? Math.round(Math.random()) : 0))
    )
}

function toggleCell(x: number, y: number) {
    grid.value[y][x] = grid.value[y][x] ? 0 : 1
    pauseTemporarily()
}

function getNextGeneration(current: number[][]): number[][] {
    const next = createGrid()

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
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
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
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

onMounted(() => {
    grid.value = createGrid(true)
    startInterval()
})

onBeforeUnmount(() => {
    clearInterval(updateTimeout)
})
</script>

<template>
    <div
        class="absolute -z-10 top-0 opacity-5 flex flex-col h-screen w-screen overflow-auto items-center mask-y-from-50% mask-y-to-100%">
        <div class="grid" :style="{ gridTemplateColumns: `repeat(${cols}, 1.5rem)` }">
            <template v-for="(row, y) in grid" :key="y">
                <div v-for="(cell, x) in row" :key="`${y}-${x}`" @click="toggleCell(x, y)"
                    class="w-6 h-6 border border-zinc-700" :class="cell ? 'bg-red-600' : ''" />
            </template>
        </div>
    </div>
</template>

<style scoped>
.grid {
    display: grid;
}
</style>

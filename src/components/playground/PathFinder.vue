<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Toolbar from './ToolBar.vue';

const algoOptions = ['BFS', 'DFS'] as const
type AlgoOptions = typeof algoOptions[number]

enum CellState {
    Empty = 0,
    Start = 1,
    Finish = 2,
    Obstacle = 3,
    Visited = 4,
    Path = 5,
}

const CellStateInfo: Record<CellState, { name: string; color: string }> = {
    [CellState.Empty]: { name: 'Empty', color: 'dark:bg-zinc-950 bg-zinc-300' },
    [CellState.Start]: { name: 'Start', color: 'bg-green-500' },
    [CellState.Finish]: { name: 'Finish', color: 'bg-blue-500' },
    [CellState.Obstacle]: { name: 'Block', color: 'bg-zinc-500' },
    [CellState.Visited]: { name: 'Visited', color: 'bg-red-600/40' },
    [CellState.Path]: { name: 'Path', color: 'bg-red-600' },
}

const cellSize = 20
const rows = ref(0)
const cols = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const grid = ref<CellState[][]>([])
type Point = { x: number, y: number }
const startCell = ref<Point | null>(null)
const finishCell = ref<Point | null>(null)
const errorText = ref("")
const currentSelectedCellType = ref<CellState>(3)
const shouldStop = ref(false)
const isMouseDown = ref(false)
const algo = ref<AlgoOptions>('BFS')

const onMouseDown = () => { isMouseDown.value = true }
const onMouseUp = () => { isMouseDown.value = false }

const cellStateValues = Object.keys(CellState)
    .filter(k => isNaN(Number(k))) as (keyof typeof CellState)[]

function createGrid(): number[][] {
    return Array.from({ length: rows.value }, () =>
        Array.from({ length: cols.value }, () => 0)
    )
}

function calculateGrid() {
    if (containerRef.value) {
        const size = containerRef.value.clientWidth
        const count = Math.floor(size / cellSize)
        rows.value = count
        cols.value = count
    }
}

const parents = ref<Record<string, string>>({})

async function DFS() {
    const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]]
    let steps = 0
    let found = false

    const _dfs = async (node: Point | null) => {
        if (!node || found) return

        for (const [dx, dy] of directions) {
            const nx = node.x + dx
            const ny = node.y + dy
            const withinBoundaries = 0 <= nx && nx < cols.value && 0 <= ny && ny < rows.value

            if (withinBoundaries) {
                if (grid.value[ny][nx] == 2) {
                    found = true
                    parents.value[`${nx},${ny}`] = `${node.x},${node.y}`
                    return
                } else if (grid.value[ny][nx] == 0) {
                    grid.value[ny][nx] = 4
                    parents.value[`${nx},${ny}`] = `${node.x},${node.y}`
                    await _dfs({ x: nx, y: ny })
                }
            }
            steps++
            if (steps % 10 === 0) await new Promise(requestAnimationFrame)
        }
    }

    await _dfs(startCell.value)
}

async function BFS() {
    const queue = [startCell.value]
    const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]]
    let steps = 0

    while (queue && !shouldStop.value) {
        const node = queue.shift()
        for (const [dx, dy] of directions) {
            if (!node) return

            const nx = node.x + dx
            const ny = node.y + dy
            const withinBoundaries = 0 <= nx && nx < cols.value && 0 <= ny && ny < rows.value

            if (withinBoundaries) {
                if (grid.value[ny][nx] == 2) {
                    parents.value[`${nx},${ny}`] = `${node.x},${node.y}`
                    return
                } else if (grid.value[ny][nx] == 0) {
                    grid.value[ny][nx] = 4
                    queue.push({ x: nx, y: ny })
                    parents.value[`${nx},${ny}`] = `${node.x},${node.y}`
                }
            }
        }
        steps++
        if (steps % 10 === 0) await new Promise(requestAnimationFrame)
    }
}

async function backtrack() {
    if (shouldStop.value) return

    const steps = 0
    const start = `${startCell.value?.x},${startCell.value?.y}`
    let currentVal = `${finishCell.value?.x},${finishCell.value?.y}`
    let parent = parents.value[currentVal]

    while (parent !== start) {
        if (steps % 4 === 0) await new Promise(requestAnimationFrame)
        const [x, y] = parent.split(',').map(Number)
        grid.value[y][x] = 5
        currentVal = parent
        parent = parents.value[currentVal]
    }

}

async function startAnimation() {
    parents.value = {}
    shouldStop.value = false
    errorText.value = ""
    if (!startCell.value || !finishCell.value) {
        errorText.value = "Please select a start and finish cell."
        return
    }
    if (algo.value == 'BFS') await BFS()
    if (algo.value == 'DFS') await DFS()

    await backtrack()
}

function toggleCell(x: number, y: number) {
    if (currentSelectedCellType.value == 1) {
        if (startCell.value) {
            grid.value[startCell.value.y][startCell.value.x] = 0
        }
        startCell.value = { x, y }
    } else if (currentSelectedCellType.value == 2) {
        if (finishCell.value) {
            grid.value[finishCell.value.y][finishCell.value.x] = 0
        }
        finishCell.value = { x, y }
    }
    grid.value[y][x] = currentSelectedCellType.value
}

function handleCellHover(x: number, y: number) {
    if (isMouseDown.value) {
        toggleCell(x, y)
    }
}

function clear() {
    shouldStop.value = true
    grid.value = createGrid(true)
    errorText.value = ""
    parents.value = {}
}

onMounted(() => {
    calculateGrid()
    grid.value = createGrid(true)
    window.addEventListener('mouseup', onMouseUp)
})

onBeforeUnmount(() => {
    window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
    <div class="motion-preset-focus-lg h-full select-none overflow-hidden flex items-center justify-center mask-fade-between">
        <div ref="containerRef" class="w-full aspect-square border-y-2 dark:border-zinc-600/20 overflow-hidden">
            <div class="grid w-full" :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
                @mousedown="onMouseDown">
                <template v-for="(row, y) in grid" :key="y">
                    <div v-for="(cell, x) in row" :key="`${y}-${x}`" @mousedown.prevent="() => toggleCell(x, y)"
                        @mouseenter="() => handleCellHover(x, y)" @click="toggleCell(x, y)"
                        class="aspect-square text-black text-center text-xs w-full cursor-crosshair border border-dotted border-zinc-500 dark:border-zinc-900"
                        :class="CellStateInfo[cell].color">
                        {{ cell == 1 ? 'S' : '' }}
                        {{ cell == 2 ? 'F' : '' }}
                    </div>
                </template>
            </div>
        </div>
    </div>

    <Toolbar>
        <div class="flex flex-col gap-2">
            <p v-if="errorText" class="text-red-600 absolute -top-8 right-0 left-0 text-center">{{ errorText }}</p>
            <div class="flex w-full gap-2 justify-center">
                <button class="toolbar-button" @click="startAnimation">Start</button>
                <button class="toolbar-button" @click="clear">Clear</button>
                <button v-for="option in algoOptions" :key="option" class="toolbar-button" @click="algo = option">
                    <span class="text-red-500" v-if="algo == option">✓</span>{{ option }}
                </button>
            </div>
            <div class="flex gap-2">
                <button v-for="key of cellStateValues.filter(e => !['Visited', 'Path'].includes(e))"
                    @click="currentSelectedCellType = CellState[key]" class="toolbar-button" :key="key">
                    <div class="w-4 h-4 rounded flex items-center justify-center"
                        :class="[CellStateInfo[CellState[key]].color, CellState[currentSelectedCellType] == key ? 'opacity-100' : 'opacity-30']">
                    </div>
                    {{ key }}
                </button>
            </div>
        </div>
    </Toolbar>
</template>

<style scoped>
.grid {
    display: grid;
}
</style>

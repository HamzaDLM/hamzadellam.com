<script setup lang="ts">
import type { Component } from 'vue'
import PathFinder from './playground/PathFinder.vue'

type Playgrounds = 'Path Finder' | 'Game of life' | 'Sorting'

const playgrounds: Record<Playgrounds, Component> = {
    'Path Finder': PathFinder,
    'Game of life': defineAsyncComponent(() => import('./playground/GameOfLife.vue')),
    'Sorting': defineAsyncComponent(() => import('./playground/SortingAlgo.vue')),
}

const playgroundKeys = Object.keys(playgrounds) as Playgrounds[]

const activePlayground = ref<Playgrounds>('Path Finder')

const selectGame = (key: Playgrounds) => {
    activePlayground.value = key
}
</script>

<template>
    <div class="pt-5 md:pt-12 h-full overflow-hidden">
        <div class="mb-5 flex justify-start w-full overflow-x-auto no-scrollbar gap-4 px-4 scroll-smooth">
            <button v-for="key of playgroundKeys" :key="key"
                class="px-3 py-1 rounded whitespace-nowrap text-xl uppercase md:text-4xl"
                :class="activePlayground == key ? 'dark:text-zinc-900 dark:bg-white text-white bg-zinc-900' : 'dark:text-zinc-700 dark:hover:text-zinc-400 text-zinc-400 hover:text-zinc-700'"
                @click="selectGame(key)">
                {{ key }}
            </button>
        </div>

        <div class="w-full h-2/3 md:h-5/6">
            <component :is="playgrounds[activePlayground]" />
        </div>
    </div>
</template>

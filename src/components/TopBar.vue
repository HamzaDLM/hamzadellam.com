<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

export type tabType = "About" | "Blog" | "Projects" | "Github" | "Playground" | "Pictures"

const currentTab = defineModel()
const menuOpen = ref(false)
const isDark = ref(false)

const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)
const switchTab = (tabName: tabType) => {
    closeMenu()
    currentTab.value = tabName
}

watch(isDark, (val: boolean) => {
    document.documentElement.classList.toggle('dark', val)
})

onMounted(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const setting = localStorage.getItem('pref_theme') || 'auto'
    if (setting === 'dark' || (prefersDark && setting !== 'light'))
        document.documentElement.classList.toggle('dark', true)
})
const showText = ref(true)
</script>

<template>
    <div class="flex items-center justify-between px-4 py-3">
        <div class="relative flex items-center justify-center">
            <!-- <img v-if="!showText" src="/logo.svg" class="h-12 motion-preset-blur-left" /> -->
            <h1 :class="showText ? '' : 'hidden'"
                class="whitespace-nowrap italic dark:text-zinc-200 text-zinc-800 text-4xl font-elegant motion-preset-blur-right">
                hamza dellam
            </h1>
        </div>

        <!-- Burger Icon -->
        <div class="md:hidden z-50">
            <button @click="toggleMenu"
                class="flex text-zinc-900 dark:text-zinc-700 hover:text-zinc-800 nav-bar-item dark:hover:text-zinc-600">
                <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="w-8"
                    viewBox="0 0 24 24"><!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ -->
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                        <path d="M20 7H4" />
                        <path d="M20 12H4" opacity=".5" />
                        <path d="M20 17H4" />
                    </g>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 nav-bar-item"
                    viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                    <path fill="currentColor"
                        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
                </svg>
            </button>
        </div>
        <!-- Mobile Menu Overlay -->
        <div v-if="menuOpen"
            class="fixed motion-preset-blur-down inset-0 z-40 font-elegant text-xl flex flex-col items-center justify-center gap-8 dark:bg-black/70 backdrop-blur-sm">
            <button @click="switchTab('About')"
                :class="currentTab == 'About' ? 'border-l border-b border-red-600 px-5 py-2 rounded-xl' : ''"
                class="nav-bar-item">About</button>
            <button @click="switchTab('Projects')"
                :class="currentTab == 'Projects' ? 'border-l border-b border-red-600 px-5 py-2 rounded-xl' : ''"
                class="nav-bar-item">Projects</button>
            <a href="https://github.com/HamzaDLM" target="_blank" class="nav-bar-item">Github</a>
            <button @click="switchTab('Blog')"
                :class="currentTab == 'Blog' ? 'border-l border-b border-red-600 px-5 py-2 rounded-xl' : ''"
                class="nav-bar-item">Contact</button>
            <a class="nav-bar-item text-zinc-800 dark:text-zinc-200" title="Toggle Color Scheme"
                @click="isDark = !isDark">
                <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="w-9" viewBox="0 0 24 24">
                    <g fill="currentColor" fill-opacity="0">
                        <path
                            d="M15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z">
                            <animate id="lineMdMoonLoop0" fill="freeze" attributeName="fill-opacity"
                                begin="0.7s;lineMdMoonLoop0.begin+6s" dur="0.4s" values="0;1" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.2s"
                                dur="0.4s" values="1;0" />
                        </path>
                        <path
                            d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3s"
                                dur="0.4s" values="0;1" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.2s"
                                dur="0.4s" values="1;0" />
                        </path>
                        <path
                            d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+0.4s"
                                dur="0.4s" values="0;1" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.8s"
                                dur="0.4s" values="1;0" />
                        </path>
                        <path
                            d="M20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3.4s"
                                dur="0.4s" values="0;1" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.6s"
                                dur="0.4s" values="1;0" />
                        </path>
                    </g>
                    <path fill="none" stroke="currentColor" stroke-dasharray="56" stroke-dashoffset="56"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0" />
                    </path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-9" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2">
                        <path stroke-dasharray="2" stroke-dashoffset="2" d="M12 19v1M19 12h1M12 5v-1M5 12h-1">
                            <animate fill="freeze" attributeName="d" begin="1.2s" dur="0.2s"
                                values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1" />
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s"
                                values="2;0" />
                        </path>
                        <path stroke-dasharray="2" stroke-dashoffset="2"
                            d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5">
                            <animate fill="freeze" attributeName="d" begin="1.4s" dur="0.2s"
                                values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.4s" dur="0.2s"
                                values="2;0" />
                        </path>
                        <animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate"
                            values="0 12 12;360 12 12" />
                    </g>
                    <g fill="currentColor">
                        <path
                            d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
                            <animate fill="freeze" attributeName="fill-opacity" dur="0.4s" values="1;0" />
                        </path>
                        <path
                            d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="0.2s" dur="0.4s" values="1;0" />
                        </path>
                    </g>
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z">
                        <set fill="freeze" attributeName="opacity" begin="0.6s" to="0" />
                    </path>
                    <mask id="lineMdMoonToSunnyOutlineLoopTransition0">
                        <circle cx="12" cy="12" r="12" fill="#fff" />
                        <circle cx="12" cy="12" r="8">
                            <animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="8;4" />
                        </circle>
                        <circle cx="18" cy="6" r="12" fill="#fff">
                            <animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22" />
                            <animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2" />
                            <animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="12;3" />
                        </circle>
                        <circle cx="18" cy="6" r="10">
                            <animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22" />
                            <animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2" />
                            <animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;1" />
                        </circle>
                    </mask>
                    <circle cx="12" cy="12" r="10" mask="url(#lineMdMoonToSunnyOutlineLoopTransition0)" opacity="0"
                        fill="currentColor">
                        <animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;6" />
                        <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
                    </circle>
                </svg>
            </a>
            <button @click="switchTab('Playground')" class="nav-bar-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <g fill="none">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M8.5 11v3M7 12.5h3" />
                        <path stroke="currentColor" stroke-width="1.5"
                            d="m21.92 17.377l-1.085-4.517c-.613-2.553-.92-3.83-1.79-4.666q-.331-.319-.725-.56C17.284 7 15.937 7 13.243 7h-2.486c-2.694 0-4.041 0-5.077.634q-.394.241-.725.56c-.87.837-1.177 2.113-1.79 4.666L2.08 17.377c-.381 1.587.633 3.175 2.264 3.546c1.376.312 2.791-.342 3.413-1.576l.128-.255c.57-1.133 1.754-1.852 3.051-1.852h2.128c1.297 0 2.48.719 3.051 1.852l.128.255c.622 1.234 2.037 1.888 3.413 1.575c1.631-.37 2.645-1.958 2.264-3.545Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
                            d="M12 7V6a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1V3" />
                        <path fill="currentColor"
                            d="M16 11a1 1 0 1 1-2 0a1 1 0 0 1 2 0m2 3a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
                    </g>
                </svg>
            </button>
        </div>
        <!-- Desktop -->
        <div
            class="gap-4 xs:bg-black hidden md:flex items-center text-sm lg:text-base text-zinc-700 dark:text-zinc-400 font-elegant">
            <button @click="switchTab('About')" class="nav-bar-item">About</button>
            <button @click="switchTab('Projects')" class="nav-bar-item">Projects</button>
            <button @click="switchTab('Blog')" class="nav-bar-item">Contact</button>
            <a href="https://github.com/HamzaDLM" target="_blank" class="nav-bar-item"><svg
                    xmlns="http://www.w3.org/2000/svg" class="w-5"
                    viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt -->
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.3">
                        <path stroke-dasharray="32" stroke-dashoffset="32"
                            d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0" />
                        </path>
                        <path stroke-dasharray="10" stroke-dashoffset="10"
                            d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s"
                                values="10;0" />
                        </path>
                    </g>
                </svg>
            </a>
            <a class="nav-bar-item text-zinc-500 dark:text-zinc-400" title="Toggle Color Scheme"
                @click="isDark = !isDark">
                <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="w-5"
                    viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt -->
                    <g fill="currentColor" fill-opacity="0">
                        <path
                            d="M15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z">
                            <animate id="lineMdMoonLoop0" fill="freeze" attributeName="fill-opacity"
                                begin="0.7s;lineMdMoonLoop0.begin+6s" dur="0.4s" values="0;1" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.2s"
                                dur="0.4s" values="1;0" />
                        </path>
                        <path
                            d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3s"
                                dur="0.4s" values="0;1" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.2s"
                                dur="0.4s" values="1;0" />
                        </path>
                        <path
                            d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+0.4s"
                                dur="0.4s" values="0;1" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.8s"
                                dur="0.4s" values="1;0" />
                        </path>
                        <path
                            d="M20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3.4s"
                                dur="0.4s" values="0;1" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.6s"
                                dur="0.4s" values="1;0" />
                        </path>
                    </g>
                    <path fill="none" stroke="currentColor" stroke-dasharray="56" stroke-dashoffset="56"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3"
                        d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0" />
                    </path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5"
                    viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt -->
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2">
                        <path stroke-dasharray="2" stroke-dashoffset="2" d="M12 19v1M19 12h1M12 5v-1M5 12h-1">
                            <animate fill="freeze" attributeName="d" begin="1.2s" dur="0.2s"
                                values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1" />
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s"
                                values="2;0" />
                        </path>
                        <path stroke-dasharray="2" stroke-dashoffset="2"
                            d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5">
                            <animate fill="freeze" attributeName="d" begin="1.4s" dur="0.2s"
                                values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.4s" dur="0.2s"
                                values="2;0" />
                        </path>
                        <animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate"
                            values="0 12 12;360 12 12" />
                    </g>
                    <g fill="currentColor">
                        <path
                            d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
                            <animate fill="freeze" attributeName="fill-opacity" dur="0.4s" values="1;0" />
                        </path>
                        <path
                            d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="0.2s" dur="0.4s" values="1;0" />
                        </path>
                    </g>
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z">
                        <set fill="freeze" attributeName="opacity" begin="0.6s" to="0" />
                    </path>
                    <mask id="lineMdMoonToSunnyOutlineLoopTransition0">
                        <circle cx="12" cy="12" r="12" fill="#fff" />
                        <circle cx="12" cy="12" r="8">
                            <animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="8;4" />
                        </circle>
                        <circle cx="18" cy="6" r="12" fill="#fff">
                            <animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22" />
                            <animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2" />
                            <animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="12;3" />
                        </circle>
                        <circle cx="18" cy="6" r="10">
                            <animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22" />
                            <animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2" />
                            <animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;1" />
                        </circle>
                    </mask>
                    <circle cx="12" cy="12" r="10" mask="url(#lineMdMoonToSunnyOutlineLoopTransition0)" opacity="0"
                        fill="currentColor">
                        <animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;6" />
                        <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
                    </circle>
                </svg>
            </a>
            <button @click="switchTab('Playground')" class="nav-bar-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5"
                    viewBox="0 0 24 24"><!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ -->
                    <g fill="none">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M8.5 11v3M7 12.5h3" />
                        <path stroke="currentColor" stroke-width="1.5"
                            d="m21.92 17.377l-1.085-4.517c-.613-2.553-.92-3.83-1.79-4.666q-.331-.319-.725-.56C17.284 7 15.937 7 13.243 7h-2.486c-2.694 0-4.041 0-5.077.634q-.394.241-.725.56c-.87.837-1.177 2.113-1.79 4.666L2.08 17.377c-.381 1.587.633 3.175 2.264 3.546c1.376.312 2.791-.342 3.413-1.576l.128-.255c.57-1.133 1.754-1.852 3.051-1.852h2.128c1.297 0 2.48.719 3.051 1.852l.128.255c.622 1.234 2.037 1.888 3.413 1.575c1.631-.37 2.645-1.958 2.264-3.545Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
                            d="M12 7V6a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1V3" />
                        <path fill="currentColor"
                            d="M16 11a1 1 0 1 1-2 0a1 1 0 0 1 2 0m2 3a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
                    </g>
                </svg>
            </button>
            <button @click="switchTab('Pictures')" class="nav-bar-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5"
                    viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                    <path fill="currentColor"
                        d="M11.4 9h8q-.675-1.725-2.062-2.963T14.15 4.3zm-2.3 2l4-6.9q-.275-.05-.55-.075T12 4q-1.65 0-3.075.625T6.4 6.3zm-4.85 3H9.7l-4-6.9q-.8 1.025-1.25 2.263T4 12q0 .525.063 1.013T4.25 14m5.6 5.7l2.7-4.7H4.6q.675 1.725 2.063 2.963T9.85 19.7M12 20q1.65 0 3.075-.625T17.6 17.7L14.9 13l-4 6.9q.275.05.538.075T12 20m6.3-3.1q.8-1.025 1.25-2.262T20 12q0-.525-.062-1.012T19.75 10H14.3zM12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 2q2.075 0 3.888.788t3.174 2.15t2.15 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188t-3.175 2.15T12 22" />
                </svg>
            </button>
        </div>
    </div>
</template>

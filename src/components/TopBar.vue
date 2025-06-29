<script setup lang="ts">
export type Tab = "About" | "Projects" | "Contact" | "Github" | "Playground"

const currentTab = defineModel()
const menuOpen = ref(false)
const isDark = ref(false)
const showText = ref(true)

const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)
const switchTab = (tabName: Tab) => {
    closeMenu()
    currentTab.value = tabName
}

function setThemeFromPreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const setting = localStorage.getItem('pref_theme') || 'auto'
    isDark.value = setting === 'dark' || (setting === 'auto' && prefersDark)
    document.documentElement.classList.toggle('dark', isDark.value)
}

function styleMobileTabs(tab: Tab) {
    if (currentTab.value == tab) {
        return 'border-l border-b border-red-600 px-5 py-2 rounded-xl'
    }
}

function openEmail() {
    window.location.href = 'mailto:hamzadellam@gmail.com?subject=Hello&body=I want to reach out!'
}

function toggleTheme() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('pref_theme', isDark.value ? 'dark' : 'light')
}

onMounted(setThemeFromPreference)
</script>

<template>
    <div class="flex items-center justify-between px-4 py-3">
        <div class="relative flex items-center justify-center">
            <h1 v-if="showText"
                class="whitespace-nowrap italic dark:text-zinc-200 text-zinc-800 text-4xl font-elegant motion-preset-blur-right">
                hamza dellam
            </h1>
        </div>

        <!-- Mobile -->
        <div class="md:hidden z-50">
            <button @click="toggleMenu"
                class="flex text-zinc-900 dark:text-zinc-700 hover:text-zinc-800 nav-bar-item dark:hover:text-zinc-600">
                <BurgerClosedIcon v-if="!menuOpen" class="w-8" />
                <BurgerOpenIcon v-else class="w-8" />
            </button>
        </div>
        <div v-if="menuOpen"
            class="fixed motion-preset-blur-down inset-0 z-40 font-elegant text-xl flex flex-col items-center justify-center gap-8 dark:bg-black/70 backdrop-blur-sm">
            <button @click="switchTab('About')" :class="styleMobileTabs('About')" class="nav-bar-item">About</button>
            <button @click="switchTab('Projects')" :class="styleMobileTabs('Projects')"
                class="nav-bar-item">Projects</button>
            <button @click="openEmail" :class="styleMobileTabs('Contact')" class="nav-bar-item">Contact</button>
            <button href="https://github.com/HamzaDLM" target="_blank" class="nav-bar-item">
                <GithubIcon class="w-9" />
            </button>
            <button @click="switchTab('Playground')" class="nav-bar-item">
                <PlaygroundIcon class="w-9" />
            </button>
            <!-- <button @click="switchTab('Pictures')" class="nav-bar-item">
                <PictureIcon class="w-9" />
            </button> -->
            <button class="nav-bar-item" @click="toggleTheme">
                <LightModeIcon v-if="isDark" class="w-9" />
                <DarkModeIcon v-else class="w-9" />
            </button>
        </div>

        <!-- Desktop -->
        <div
            class="gap-4 xs:bg-black hidden md:flex items-center text-sm lg:text-base text-zinc-700 dark:text-zinc-400 font-elegant">
            <button @click="switchTab('About')" class="nav-bar-item">About</button>
            <button @click="switchTab('Projects')" class="nav-bar-item">Projects</button>
            <button @click="openEmail" class="nav-bar-item">
                <MailIcon class="w-6" />
            </button>
            <button href="https://github.com/HamzaDLM" target="_blank" class="nav-bar-item">
                <GithubIcon class="w-5" />
            </button>
            <button @click="switchTab('Playground')" class="nav-bar-item">
                <PlaygroundIcon class="w-5" />
            </button>
            <!-- <button @click="switchTab('Pictures')" class="nav-bar-item">
                <PictureIcon class="w-5" />
            </button> -->
            <button class="nav-bar-item" @click="toggleTheme">
                <LightModeIcon v-if="isDark" class="w-5" />
                <DarkModeIcon v-else class="w-5" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NetworkIcon from './icons/Network.vue'
import ContainerIcon from './icons/Container.vue'

interface Item {
    title: string
    description: string
    imageFolder: string
    icon: string
    tech: string
}

const selectedItem = ref<Item | null>(null)
const items = ref<Item[]>([
    {
        title: 'Easynet',
        icon: NetworkIcon,
        imageFolder: "easynet",
        tech: 'Typescript, Golang, Python, Vue, FastAPI, PostgreSQL, Redis, Nginx, Apache, Tailwind, Ansible, Zabbix...',
        description: "Internal platform used globally across BNP teams to manage infrastructure device life-cycle, tracking inventory, automating configs, integrating with monitoring / auth services to enable seamless provisioning and visibility, retiring devices into reusable parts, tracking obsolescence and generating audit - compliant reports",
    },
    {
        title: 'Blue Container',
        icon: ContainerIcon,
        imageFolder: "container",
        tech: 'Typescript, Golang, Python, Fiber',
        description: "Full-stack IoT platform to monitor and manage maritime shipping containers, with rule-based alerting system considering container- level and gateway - level thresholds.",
    },
    {
        title: 'Luméa',
        icon: '',
        imageFolder: "lumea",
        tech: 'Typescript, Golang, Python, Fiber',
        description: "AI-powered chatting app that prioritizes improving communication, using real-time LLM integration to detect elements like sarcasm and defensiveness, offer rephrasing suggestions during conflicts, and provide a minimalist dashboard with key communication insights.",
    },
    {
        title: 'Luméa',
        icon: '',
        imageFolder: "blue",
        tech: 'Typescript, Golang, Python, Fiber',
        description: "I'm Hamza, a software developer with a strong focus on building practical and scalable solutions, especially",
    },
    {
        title: 'Luméa',
        icon: '',
        imageFolder: "blue",
        tech: 'Typescript, Golang, Python, Fiber',
        description: "I'm Hamza, a software developer with a strong focus on building practical and scalable solutions, especially",
    },
    {
        title: 'Luméa',
        icon: '',
        imageFolder: "blue",
        tech: 'Typescript, Golang, Python, Fiber',
        description: "I'm Hamza, a software developer with a strong focus on building practical and scalable solutions, especially",
    },
])

const allImages = {
    lumea: import.meta.glob('@/assets/lumea/*.png', { eager: true, import: 'default' }),
    easynet: import.meta.glob('@/assets/easynet/*.png', { eager: true, import: 'default' }),
    container: import.meta.glob('@/assets/container/*.png', { eager: true, import: 'default' }),
}
</script>

<template>
    <div>
        <h1 class="title pb-10 text-center">Projects</h1>
        <div v-if="selectedItem == null"
            class="no-scrollbar hidden h-[700px] border-t border-red-600/10 overflow-auto mask-b-from-80% mask-b-to-100% md:block">
            <div class="grid grid-cols-3 ">
                <div v-for="item of items" @click="selectedItem = item"
                    class="flex flex-col justify-between border min-h-[400px] opacity-80 hover:opacity-100 relative border-red-600 p-4 group">
                    <!-- <p class="text-xs text-zinc-500">last update: {{ item.last_update }}</p> -->
                    <div>

                        <h1 class="mb-2 text-5xl flex font-semibold whitespace-nowrap items-center gap-2">
                            <span>
                                <component :is="item.icon"
                                    class="text-4xl flex items-center justify-center text-white" />
                            </span> {{ item.title }}
                        </h1>
                        <a href="#" class="group relative mb-2 inline-block text-5xl font-semibold text-white">
                            <span
                                class="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full">
                            </span>
                        </a>
                        <p class="text-zinc-400">{{ item.description }}</p>
                    </div>
                    <div class="bottom-0">
                        <p class="mt-4 text-sm text-zinc-600">{{ item.tech }}</p>
                    </div>
                    <!-- <div class="h-full w-full absolute top-0 hidden group-hover:block">
                        <img src="/src/assets/blue.png" class="rounded-lg" alt="">
                    </div> -->
                </div>
            </div>
        </div>
        <div v-else class="border min-h-[400px] relative border-red-600 p-4">
            <!-- <p class="text-xs text-zinc-500">last update: {{ item.last_update }}</p> -->
            <div>

                <h1 class="mb-2 text-5xl flex font-semibold whitespace-nowrap items-center gap-2">
                    <span>
                        <component :is="selectedItem?.icon"
                            class="text-4xl flex items-center justify-center text-white" />
                    </span> {{ selectedItem?.title }}
                </h1>
                <a href="#" class="group relative mb-2 inline-block text-5xl font-semibold text-white">
                    <span
                        class="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full">
                    </span>
                </a>
                <p class="text-zinc-400">{{ selectedItem?.description }}</p>
            </div>
            <div class="bottom-0">
                <p class="mt-4 text-sm text-zinc-600">{{ selectedItem?.tech }}</p>
            </div>

            <div class="grid grid-cols-4 gap-4">
                <img v-for="(src, index) in Object.values(allImages[selectedItem.imageFolder])" :key="index" :src="src"
                    class="w-full bg-red-400 h-auto object-cover aspect-square" />
            </div>

        </div>
    </div>
</template>

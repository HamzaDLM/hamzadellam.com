<script setup lang="ts">

interface Item {
    title: string
    description: string
    imageFolder: string
    specialty: string
    tech: string
}

const items = ref<Item[]>([
    {
        title: 'Easynet',
        imageFolder: "easynet",
        tech: 'Typescript, Golang, Python, Vue, FastAPI, PostgreSQL, Redis, Nginx, Apache, Tailwind, Ansible, Zabbix',
        specialty: 'networking & telecom',
        description: "Internal platform used globally across BNP teams to manage infrastructure device life-cycle, tracking inventory, automating configs, integrating with monitoring / auth services to enable seamless provisioning and visibility, retiring devices into reusable parts, tracking obsolescence and generating audit - compliant reports",
    },
    {
        title: 'Blue Container',
        imageFolder: "container",
        tech: 'Typescript, Golang, Python, Fiber',
        specialty: 'maritime & iot',
        description: "Full-stack IoT platform to monitor and manage maritime shipping containers, with rule-based alerting system considering container-level and gateway-level thresholds.",
    },
    {
        title: 'Luméa',
        imageFolder: "lumea",
        tech: 'Typescript, Golang, Python, Fiber',
        specialty: 'communications',
        description: "AI-powered chatting app that prioritizes improving communication, using real-time LLM integration to detect elements like sarcasm and defensiveness, offer rephrasing suggestions during conflicts, and provide a minimalist dashboard with key communication insights.",
    },
    {
        title: 'SwatCR',
        imageFolder: "lumea",
        tech: 'Typescript, Golang, Python, Fiber, Django, FastAPI, Openshift, Nginx, Redis, MySQL, Ansible',
        specialty: 'autonomous driving',
        description: "Full-stack platform supporting autonomous vehicle software development, enabling embedded engineers to define and manage complex data types...",
    }
])
</script>

<template>
    <div class="h-full overflow-auto no-scrollbar items-center justify-center">
        <p class="title pt-5 z-10 text-center w-full md:text-7xl">Projects</p>

        <div class="flex-1 overflow-auto pb-40 md:pb-10 font-elegant md:mt-10 py-8 xl:px-56 px-5">
            <div v-for="item of items" :key="item.title"
                class="md:flex items-start group gap-4 border-t dark:border-zinc-800/40 border-zinc-900/10 justify-between w-full py-5 md:py-8">
                <div class="mb-8 md::m-0">
                    <h2 class="text-5xl lg:text-7xl font-bold mb-4 flex items-center gap-2">
                        {{ item.title }}
                    </h2>
                    <p class="text-zinc-700 text-sm group-hover:text-red-600">{{ item.specialty }}</p>
                </div>
                <div class="md:w-2/4">
                    <p class="dark:text-zinc-300 text-zinc-800 mb-2">{{ item.description }}</p>
                    <p class="text-sm text-zinc-600">{{ item.tech }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

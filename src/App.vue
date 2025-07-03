<script setup lang="ts">
import About from './components/About.vue';
import Projects from './components/Projects.vue';
import Bottom from './components/Bottom.vue';
import TopBar, { type Tab } from './components/TopBar.vue';
import Playground from './components/Playground.vue';
// import Pictures from './components/Pictures.vue';

const mounted = ref(false)
const currentTab = ref<Tab>('About')
const intro = ref(true)
const tabs: Partial<Record<Tab, Component>> = {
	'About': About,
	'Projects': Projects,
	'Playground': Playground,
	// 'Pictures': Pictures
}

onMounted(() => {
	setTimeout(() => {
		intro.value = !intro.value
	}, 500)

	setTimeout(() => {
		mounted.value = true
	}, 200)
})
</script>

<template>
	<main class="w-screen h-screen flex flex-col no-scrollbar">
		<div
			class="absolute inset-0 bg-[url('/src/assets/bgnoise.avif')] bg-repeat opacity-20 dark:opacity-10 pointer-events-none" />
		<div class="h-1 bg-red-600 w-screen absolute top-0 left-0"></div>

		<div v-if="intro" class="w-screen h-screen bg-zinc-200 dark:bg-zinc-950 flex items-center justify-center">
			<img src="/logo.svg" class="h-1/3 w-1/3 motion-preset-blink" />
		</div>

		<div v-else class="flex flex-col flex-1 min-h-0">
			<TopBar v-model="currentTab" />

			<div class="flex-1 min-h-0 overflow-auto no-scrollbar">
				<component :is="tabs[currentTab]" class="w-full h-full motion-preset-focus" />
			</div>

			<Bottom class="hidden md:block" />
		</div>
	</main>
</template>

<style>
html:not(.js) .romo-animate {
	opacity: 0;
}

@keyframes marquee {
	0% {
		transform: translateX(0%);
	}

	100% {
		transform: translateX(-100%);
	}
}

.animate-marquee {
	animation: marquee 20s linear infinite;
}
</style>

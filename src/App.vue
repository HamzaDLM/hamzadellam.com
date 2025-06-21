<script setup lang="ts">
import { onMounted, ref } from 'vue';
import About from './components/About.vue';
import Projects from './components/Projects.vue';
import Bottom from './components/Bottom.vue';
import TopBar, { type tabType } from './components/TopBar.vue';
import Playground from './components/Playground.vue';
import Pictures from './components/Pictures.vue';

const showText = ref(true)
const mounted = ref(false)
const currentTab = ref<tabType>('About')
const intro = ref(true)

onMounted(() => {
	setTimeout(() => {
		intro.value = !intro.value
	}, 1000)

	setTimeout(() => {
		mounted.value = true
	}, 200)
})
</script>

<template>
	<div v-if="intro" class="w-screen h-screen dark:bg-zinc-950 flex items-center justify-center">
		<img src="/logo.svg" class="h-1/3 w-1/3 motion-preset-blink" />
	</div>
	<!-- v-if="mounted" -->
	<main v-else class="relative w-screen flex flex-col h-screen no-scrollbar overflow-auto">
		<div class="h-1 bg-red-600 w-screen absolute top-0 left-0"></div>
		<!-- <div class="absolute inset-0 bg-[url('/src/assets/bgnoise.avif')] bg-repeat opacity-10 pointer-events-none"></div> -->

		<TopBar v-model="currentTab" />

		<div v-if="currentTab == 'About'"
			class="flex-1 flex justify-center pt-10 pb-40 lg:p-0 lg:items-center motion-preset-focus">
			<About />
		</div>
		<div v-if="currentTab == 'Projects'" class="flex-1 font-elegant flex justify-center mt-20 motion-preset-focus">
			<Projects />
		</div>
		<div v-if="currentTab == 'Playground'"
			class="flex-1 font-elegant flex justify-center mt-20 motion-preset-focus">
			<Playground />
		</div>
		<div v-if="currentTab == 'Pictures'" class="flex-1 font-elegant flex justify-center mt-20 motion-preset-focus">
			<Pictures />
		</div>

		<!-- <div
      class="flex flex-col gap-4 rounded-2xl bg-zinc-900/30 border text-zinc-500 -translate-y-1/2 top-1/2 right-0 mr-4 py-5 absolute border-zinc-600 shadow w-min p-2">
      <button v-for="_ in 5" class="cursor-pointer hover:text-zinc-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5"
          viewBox="0 0 24 24">
          <g fill="none">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M8.5 11v3M7 12.5h3" />
            <path stroke="currentColor" stroke-width="1.5"
              d="m21.92 17.377l-1.085-4.517c-.613-2.553-.92-3.83-1.79-4.666q-.331-.319-.725-.56C17.284 7 15.937 7 13.243 7h-2.486c-2.694 0-4.041 0-5.077.634q-.394.241-.725.56c-.87.837-1.177 2.113-1.79 4.666L2.08 17.377c-.381 1.587.633 3.175 2.264 3.546c1.376.312 2.791-.342 3.413-1.576l.128-.255c.57-1.133 1.754-1.852 3.051-1.852h2.128c1.297 0 2.48.719 3.051 1.852l.128.255c.622 1.234 2.037 1.888 3.413 1.575c1.631-.37 2.645-1.958 2.264-3.545Z" />
            <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
              d="M12 7V6a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1V3" />
            <path fill="currentColor" d="M16 11a1 1 0 1 1-2 0a1 1 0 0 1 2 0m2 3a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
          </g>
        </svg>
      </button>
    </div> -->

		<Bottom />
	</main>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
	display: none;
}

.no-scrollbar {
	scrollbar-width: none;
	-ms-overflow-style: none;
}

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

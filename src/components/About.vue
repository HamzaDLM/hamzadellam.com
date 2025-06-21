<script setup lang="ts">
import Companies from './Companies.vue';
</script>

<template>
    <div class="justify-center w-full bg-zinc-600/20 dark:bg-zinc-800/20 p-5 lg:p-15 lg:max-w-[1000px]">
        <p class="title">about</p>

        <p class="px-2 py-2 font-elegant text-zinc-700 mt-5 dark:text-zinc-300 text-sm lg:text-base">
            I'm Hamza, Software Designer, Developer & Devops.
            <br><br>
            Mostly working on tooling for big companies these days but I enjoy working across the stack, from project
            planning to deploying and maintaining, using a large panoplie of technologies and libraries. In love with
            Rust, Vue and Tailwind.
            <br><br>
            Currently working on 'Easynet', a BNP Paribas proprietary platform used globally to manage
            infrastructure device life-cycle and configuration. On the side, am working on a container monitoring
            platform
            that can integrate with any hardware and other hobby projects.
            <br><br>
            When am not coding, you'll find me playing piano and building hardware.
            <br><br>
            <span class="flex">
                Currently based in Paris,
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-zinc-400 h-6">
                    <path fill="currentColor"
                        d="M8.21 17c.44-.85.85-1.84 1.23-3H9v-2h1c.61-2.6 1-5.87 1-10h2c0 4.13.4 7.4 1 10h1v2h-.44c.38 1.16.79 2.15 1.23 3H17v2l2 3h-2.42c-.77-1.76-2.53-3-4.58-3s-3.81 1.24-4.58 3H5l2-3l-.03-2zm4.38-3h-1.18a22 22 0 0 1-1.13 3h3.44c-.4-.87-.79-1.87-1.13-3" />
                </svg> -->
                if you are around, please reach out and let's have some coffee or work together.
            </span>
        </p>

        <Companies />
    </div>
</template>
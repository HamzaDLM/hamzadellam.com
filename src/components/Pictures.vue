<script setup lang="ts">
const allImages = import.meta.glob('@/assets/photos/*.JPEG', {
    eager: true,
    import: 'default',
})

const selectedPicture = ref<string | null>(null)
const items = Object.values(allImages) as string[]
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 pt-10">
        <img @click="selectedPicture = src" v-for="(src, index) in items" :key="index" :src="src"
            class="w-full h-auto object-cover aspect-square" />
    </div>
    <div v-if="selectedPicture" @click="selectedPicture = null"
        class="w-screen h-screen absolute flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm top-0 left-0">
        <div class="w-2/3 h-2/3 flex content-center absolute ">
            <img :src="selectedPicture" class="w-full  h-auto object-cover aspect-square" />
        </div>
    </div>
</template>
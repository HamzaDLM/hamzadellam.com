<script setup>
const allImages = import.meta.glob('@/assets/photos/*.JPEG', {
    eager: true,
    import: 'default',
})

const items = Object.values(allImages)
</script>

<template>
    <div class="grid grid-cols-4 gap-4">
        <img v-for="(src, index) in items" :key="index" :src="src"
            class="w-full bg-red-400 h-auto object-cover aspect-square" />
    </div>
</template>
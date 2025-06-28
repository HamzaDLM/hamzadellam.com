<script setup lang="ts">
import imageUrl from '@/assets/vang.png'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const scale = 0.1

function handleClick() { }

onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
        const newWidth = img.width * scale
        const newHeight = img.height * scale

        canvas.width = newWidth
        canvas.height = newHeight

        ctx.imageSmoothingEnabled = false

        ctx.drawImage(img, 0, 0, newWidth, newHeight)
    }
})
</script>

<template>
    <div class="w-full h-full flex justify-center items-center bg-red-400/20">
        <div class="w-full h-full">
            <!-- <img src="../../assets/vang.png" style="width: 128px; image-rendering: pixelated;" /> -->
            <canvas ref="canvasRef" class="border" @click="handleClick"></canvas>
        </div>
    </div>
</template>

<style scoped>
canvas {
    display: block;
}
</style>

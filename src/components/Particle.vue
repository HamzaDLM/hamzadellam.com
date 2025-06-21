<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

type Particle = {
    x: number
    y: number
    vx: number
    vy: number
    groupId: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
let ctx: CanvasRenderingContext2D
let animationId: number

const MAX_GROUP_SIZE = 10
let nextGroupId = 1

function randomParticle(x?: number, y?: number): Particle {
    return {
        x: x ?? Math.random() * canvas.value!.width,
        y: y ?? Math.random() * canvas.value!.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        groupId: nextGroupId++,
    }
}

function distance(a: Particle, b: Particle): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function mergeGroups(a: Particle, b: Particle) {
    const minGroup = Math.min(a.groupId, b.groupId)
    const maxGroup = Math.max(a.groupId, b.groupId)
    particles.value.forEach(p => {
        if (p.groupId === maxGroup) {
            p.groupId = minGroup
        }
    })
}

function splitLargeGroups() {
    const groupCounts = new Map<number, Particle[]>()

    for (const p of particles.value) {
        if (!groupCounts.has(p.groupId)) groupCounts.set(p.groupId, [])
        groupCounts.get(p.groupId)!.push(p)
    }

    for (const [groupId, members] of groupCounts.entries()) {
        if (members.length > MAX_GROUP_SIZE) {
            for (let i = 0; i < members.length; i++) {
                members[i].groupId = nextGroupId++
            }
        }
    }
}

function update() {
    for (const p of particles.value) {
        p.x += p.vx
        p.y += p.vy

        // Bounce off walls
        if (p.x <= 0 || p.x >= canvas.value!.width) p.vx *= -1
        if (p.y <= 0 || p.y >= canvas.value!.height) p.vy *= -1
    }

    // Merge nearby particles
    for (let i = 0; i < particles.value.length; i++) {
        for (let j = i + 1; j < particles.value.length; j++) {
            const a = particles.value[i]
            const b = particles.value[j]
            if (distance(a, b) < 30 && a.groupId !== b.groupId) {
                mergeGroups(a, b)
            }
        }
    }

    splitLargeGroups()
}

function draw() {
    ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

    for (const p of particles.value) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${p.groupId * 40 % 360}, 100%, 70%)`
        ctx.fill()
    }
}

function loop() {
    update()
    draw()
    animationId = requestAnimationFrame(loop)
}

function handleClick(e: MouseEvent) {
    const rect = canvas.value!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    for (let i = 0; i < 5; i++) {
        particles.value.push(randomParticle(x, y))
    }
}

onMounted(() => {
    const c = canvas.value!
    c.width = c.offsetWidth
    c.height = c.offsetHeight
    ctx = c.getContext('2d')!

    // Spawn initial particles
    for (let i = 0; i < 30; i++) {
        particles.value.push(randomParticle())
    }

    loop()
})

onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
})
</script>

<template>
    <canvas ref="canvas" class="w-full h-full bg-black" @click="handleClick"></canvas>
</template>

<style scoped>
canvas {
    display: block;
}
</style>

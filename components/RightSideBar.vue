<script setup>
    const props = defineProps({
        title: String,
        infoMap: Map,
        // details: RightSideDetails,
        details: Object
    })
</script>

<template>
    <div class="absolute w-1/4 h-full right-0 top-0 bg-white border-l">
        <div class="flex border-b p-4">
            <div class="w-1/6 text-center">
                <i class="fa-solid fa-clock-rotate-left" />
            </div>
            <div class="w-2/3 text-left font-bold">
                {{ title }}
            </div>
            <div class="w-1/6 text-center" @click="$emit('close-bar')">
                <i class="fa-solid fa-arrow-right" />
            </div>
        </div>
        <div class="text-xs border-b p-4">
            <div class="font-bold text-gray-400 p-4">
                GENERAL
            </div>
            <div v-for="[key, value] in infoMap" class="p-2">
                <span class="font-bold">{{ key }}: </span>
                {{ value }}
            </div>
        </div>
        <div class="p-4 text-xs">
            <div v-if="details?.type === 'download'" class="text-blue-400 font-bold">
                <i class="fa-solid fa-download" />
                {{ details.text }}
            </div>
        </div>
    </div>
</template>
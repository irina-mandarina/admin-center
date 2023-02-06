
<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()
    defineProps({
        tab: String
    })
</script>

<template>
    <NuxtLink :to="tab.toLowerCase()">
        <li class="mx-2 border-gray-500 border-box focus:outline-none" :class="{
            'border-b-2': route.path.includes(tab.toLowerCase()),
        }">
                {{ tab }}
        </li> 
    </NuxtLink>
</template>
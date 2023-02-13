<script setup>
    import { useRoute } from 'vue-router'
    let servers = ref(["Val's server"])
    const route = useRoute()
</script>

<template>
    <TopBar />
    <div class="flex">
        <Navigation class="w-1/6" />
        <div class="w-5/6">
            <DataBridgeTopBar :servers="servers" class="w-full" />
            <slot class="" />
        </div>
    </div>
</template>
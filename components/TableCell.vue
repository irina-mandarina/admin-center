<script setup>
    defineProps({
        data: String
    })
</script>

<template>
    <td class="py-2 rounded-full w-min whitespace-nowrap" :class="{
        'text-green-900': data === 'Success',
        'bg-green-50': data === 'Success',

        'text-yellow-900': data === 'Cancelled',
        'bg-yellow-50': data === 'Cancelled',

        'text-blue-900': data === 'In progress',
        'bg-blue-50': data === 'In progress',

        'text-red-900': data === 'Error',
        'bg-red-50': data === 'Error'
    }">
        {{ data }}
    </td>
</template>
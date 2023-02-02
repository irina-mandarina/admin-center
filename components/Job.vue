<script setup>
    const props = defineProps({
        job: Object
    })
</script>

<template>
    <tr class="border-b">
        <td class="py-3">
            {{ job.name }}
        </td>
        <td class="py-3">
            {{ job.id }}
        </td>
        <td class="py-3">
            {{ job.type }}
        </td>
        <td class="py-3">
            {{ job.owner }}
        </td>
        <td class="py-3">
            {{ job.resource }}
        </td>
        <td class="py-3">
            {{ job.dateRange }}
        </td>
        <td class="py-3">
            <div class="rounded-full text-center px-2 w-min whitespace-nowrap" :class="{
                'text-green-900': job.status === 'Success',
                'bg-green-50': job.status === 'Success',

                'text-gray-900': job.status === 'Cancelled',
                'bg-gray-50': job.status === 'Cancelled',

                'text-yellow-900': job.status === 'In progress',
                'bg-yellow-50': job.status === 'In progress',

                'text-red-900': job.status === 'Error',
                'bg-red-50': job.status === 'Error'
            }">
                {{ job.status }}
            </div>
        </td>
    </tr>
</template>
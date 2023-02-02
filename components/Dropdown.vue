<script setup>
    const props = defineProps({
        name: String,
        options: Array
    })

    const emits = defineEmits([
        'chooseOption'
    ])

    let chosenOption = ref(props.name)
    let opened = ref(false)

    function chooseOption(option) {
        emits('chooseOption', option)
        opened.value = false
        chosenOption.value = option
    }
</script>

<template>
    <div class="relative inline-block">
        <button @click="opened = !opened" class="inline px-3 w-full py-1 text-left outline outline-1 outline-gray-400" :class="{
            'shadow-sm': opened,
            'outline-2': opened,
            'outline-blue-400': opened
        }">
            {{ chosenOption }}
            <i v-if="!opened" class="fa fa-chevron-down float-right p-1" :class="{
            'text-blue-500': opened
            }"/>
            <i v-if="opened" class="fa fa-chevron-up float-right p-1" :class="{
            'text-blue-500': opened
            }"/>
        </button>

        <div v-if="opened" class="absolute my-1 right-0 left-0 border border-gray-300 shadow-md z-50">
            <div v-for="option in options" @click="chooseOption(option)" class="border-b border-gray-300 bg-white px-3 py-1 bg-white hover:bg-blue-50">
                {{ option }}
            </div>
        </div>
    </div>
</template>
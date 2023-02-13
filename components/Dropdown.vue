<script setup>
    const props = defineProps({
        name: String,
        selectKey: String,
        options: Array
    })

    const emit = defineEmits([
        'choose-option'
    ])

    let chosenOption = ref(props.name)
    let opened = ref(false)

    function chooseOption(key, option) {
        emit('choose-option', key, option)
        opened.value = false
        chosenOption.value = option
    }
</script>

<template>
    <div class="relative inline-block">
        <button @click="opened = !opened" class="inline px-3 w-full py-1 border-box border border-gray-300" :class="{
            'shadow-sm': opened,
            'border-blue-400': opened
        }">
            <span class="float-left">{{ chosenOption }}</span>
            <i v-if="!opened" class="fa fa-chevron-down float-right text-sm" :class="{
            'text-blue-500': opened
            }"/>
            <i v-if="opened" class="fa fa-chevron-up float-right text-sm" :class="{
            'text-blue-500': opened
            }"/>
        </button>

        <div v-if="opened" class="absolute my-1 right-0 left-0 border border-gray-300 shadow-md z-50">
            <div v-for="option in options" @click="chooseOption(selectKey, option)" class="border-b border-gray-300 bg-white px-3 py-1 bg-white hover:bg-blue-50">
                {{ option }}
            </div>
        </div>
    </div>
</template>
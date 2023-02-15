<script setup>
    const props = defineProps({
        columns: Array,
        data: Object,
        filters: Array,
        pageSize: Number
    })
    
    let sortItem = ref(null)
    let sortDirection = ref(0)
    let pageNumber = ref(1)
    let displayedData = computed (() => {
        let result = props.data
        for (let filterIndex = 0; filterIndex < props.filters?.length; filterIndex++) {
            let filter = props.filters[filterIndex]
            if (filter.type === 'select') {
                result = result.filter((it) => {
                    return it[filter.key] === filter.value})
            }
            else if (filter.type === 'text') {
                result = result.filter((it) => it[filter.key].toLowerCase().includes(filter.value.toLowerCase()))
            }
        }

        let preSort = [...result]
        if (sortDirection.value !== 0) {
            return preSort.sort((left, right) => {
                if (left[sortItem.value].toLowerCase() < right[sortItem.value].toLowerCase()) {
                    return -1 * sortDirection.value
                }
                else if (left[sortItem.value].toLowerCase() > right[sortItem.value].toLowerCase()) {
                    return 1 * sortDirection.value
                }
                else return 0
            })
        }

        return result
    })

    let page = computed(() => {
        return displayedData.value.slice((pageNumber.value - 1) *  props.pageSize, ((pageNumber.value - 1) * props.pageSize) * props.pageSize + props.pageSize)
    })

    function previousPage() {
        if (pageNumber.value !== 1) {
            pageNumber.value--
        }
    }

    function nextPage() {
        let pages = displayedData.value.length / props.pageSize
        if (pages % 1 !== 0) {
            pages = (pages | 0) + 1
        }
        else {
            pages = pages | 0
        }
        if (pageNumber.value < pages) {
            pageNumber.value++
        }
    }

    function toggleSortDirection(column) {
        if (sortItem.value !== column) {
            // new sort item
            // reset sort direction
            sortDirection.value = 0
        }
        sortItem.value = column
        if (sortDirection.value === 0) {
            sortDirection.value = 1
        }
        else if (sortDirection.value === 1) {
            sortDirection.value = -1
        }
        else {
            sortDirection.value = 0
        }
    }
</script>

<template>
    <table class="table-fixed w-full">
        <thead>
            <tr>
                <th v-for="column in columns" class="text-left" @click="toggleSortDirection(column.key)">
                    {{ column.name }}
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 1,
                        'fa-chevron-down': sortDirection === -1,
                        'invisible': sortDirection === 0 || sortItem !== column.key
                    }"/>
                </th>
            </tr>    
        </thead>

        <tbody>
            <tr class="border-b border-gray-300 py-2" v-for="row in page">
                <TableCell v-for="td in row" :data="td" />
            </tr>
        </tbody>

    </table>
    <div class="text-gray-800 p-4 w-1/2 float-left">
        Showing {{ page.length }} of {{ displayedData.length }} items
    </div>
    <div class="inline text-gray-800 p-4 w-1/2 float-right text-right">
        <i @click="previousPage()" class="inline fa fa-chevron-left rounded-full bg-gray-200 p-1 mx-4" />
        {{ pageNumber }}
        <i @click="nextPage()" class="inline fa fa-chevron-right rounded-full bg-gray-200 p-1 mx-4" />
    </div>
</template>
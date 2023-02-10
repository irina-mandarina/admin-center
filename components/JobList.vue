<script setup>
    let jobTypes = ["Upload", "Import", "Export", "Delete", "Shrink", "Alter"]
    let resourceTypes = ["Database", "Profile", "Report", "Exposure set"]
    let statusTypes = ["Success", "Failed", "In progress", "Cancelled"]
    let jobs = [
        {"name": "DB1.mdf", "id": "42gret4w", "type": "Shrink", "owner": "John Smith", "resourceType": "Report", "dateRange": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB2.mdf", "id": "rfsfvs424", "type": "Alter", "owner": "John SmithSmith", "resourceType": "Profile", "dateRange": '1/30/2023 - 1/30/2023', "status": "Success"},
        {"name": "DB3.mdf", "id": "42rfet4", "type": "Import", "owner": "John SmithSmith", "resourceType": "Database", "dateRange": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB4.mdf", "id": "4565uytD", "type": "Upload", "owner": "John SmithSmith", "resourceType": "Database", "dateRange": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB5.mdf", "id": "4ty980p", "type": "Import", "owner": "John SmithSmith", "resourceType": "Database", "dateRange": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB6.mdf", "id": "1kiy78ytk345", "type": "Delete", "owner": "John Smith", "resourceType": "Exposure set", "dateRange": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB7.mdf", "id": "86ijt", "type": "Delete", "owner": "John Smith", "resourceType": "Exposure set", "dateRange": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
    ]
    let columns = [
        { key: 'name', name:'Job name'},
        { key: 'id', name: 'Job ID'},
        { key: 'type', name: 'Job Type'},
        { key: 'owner', name: 'Owner'},
        { key: 'type', name: 'Resource Type'},
        { key: 'dateRange', name: 'Date Range'},
        { key: 'status', name: 'Status'}]
    let pageSize = ref(5)

    let keyword = ref(null)
    let jobId = ref(null)
    let owner = ref(null)
    let activeFilters = ref([])
    let sortDirection = ref(null)
    
    let directionMult = computed (() => {
        if (sortDirection.value === "desc") {
            return -1
        }
        else return 1
    })
    
    function filterBy(key, value) {
        let type
        if (['name', 'id', 'owner', 'dateRange'].includes(key)) {
            type = 'text'
        }
        else {
            type = 'select'
        }
        activeFilters.value = activeFilters.value.filter( (it) => key !== it.key )
        if (value !== null && value.length > 0) {
            activeFilters.value.push({
                key,
                value,
                type
            })
        }
    }

</script>

<template>
    <div class="w-full relative px-8">
        <!-- filters -->
        <div class="">
            <input @keyup.enter="filterBy('name', keyword)"
                v-model="keyword"
                class="border-gray-300 border focus:outline-blue-500 p-1 mr-4"
                placeholder="Filter by keyword"/>

            <input @keyup.enter="filterBy('id', jobId)" 
                v-model="jobId"
                class="border-gray-300 border focus:outline-blue-500 p-1 m-4" 
                placeholder="Job ID" />

            <Dropdown @choose-option="filterBy"
                :options="jobTypes" name="Job Type" select-key="type" class="m-4 w-36" />

            <input @keyup.enter="filterBy('owner', owner)" 
            v-model="owner"
            class="border-gray-300 border focus:outline-blue-500 p-1 m-4" 
            placeholder="Owner"/>

            <Dropdown @choose-option="filterBy"
                :options="resourceTypes" name="Resource Type" select-key="resourceType" class="m-4 w-40" />

            <Dropdown @choose-option="filterBy"
            :options="statusTypes" name="Status" select-key="status" class="m-4 w-36" />
        </div>

        <TableTable :columns="columns" :data="jobs"  :filters="activeFilters" :page-size="pageSize" />

    </div>
</template>
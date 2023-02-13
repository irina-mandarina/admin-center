<script setup>
    let jobTypes = ["Upload", "Import", "Export", "Delete", "Shrink", "Alter"]
    let resourceTypes = ["Database", "Profile", "Report", "Exposure set"]
    let statusTypes = ["Success", "Failed", "In progress", "Cancelled"]
    let jobs = [
        {"name": "DB1.mdf", "id": "42gret4w", "type": "Shrink", "owner": "John Smith", "resource": "Report", "date": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB2.mdf", "id": "rfsfvs424", "type": "Alter", "owner": "John SmithSmith", "resource": "Profile", "date": '1/30/2023 - 1/30/2023', "status": "Success"},
        {"name": "DB3.mdf", "id": "42rfet4", "type": "Import", "owner": "John SmithSmith", "resource": "Database", "date": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB4.mdf", "id": "4565uytD", "type": "Upload", "owner": "John SmithSmith", "resource": "Database", "date": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB5.mdf", "id": "4ty980p", "type": "Import", "owner": "John SmithSmith", "resource": "Database", "date": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB6.mdf", "id": "1kiy78ytk345", "type": "Delete", "owner": "John Smith", "resource": "Exposure set", "date": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
        {"name": "DB7.mdf", "id": "86ijt", "type": "Delete", "owner": "John Smith", "resource": "Exposure set", "date": '1/30/2023 - 1/30/2023', "status": "Cancelled"},
    ]
    let columns = [
        { key: 'name', name:'Job name'},
        { key: 'id', name: 'Job ID'},
        { key: 'type', name: 'Job Type'},
        { key: 'owner', name: 'Owner'},
        { key: 'resource', name: 'Resource Type'},
        { key: 'date', name: 'Date Range'},
        { key: 'status', name: 'Status'}]
    let pageSize = ref(5)

    let keyword = ref(null)
    let jobId = ref(null)
    let owner = ref(null)
    let jobType = ref(null)
    let dateRange = ref(null)
    let resourceType = ref(null)
    let statusType = ref(null)
    
    const router = useRouter()
    const route = useRoute()

    onBeforeMount(() => {
        keyword.value = route.query.name
        owner.value = route.query.owner
        jobId.value = route.query.id
        jobType.value = route.query.job
        resourceType.value = route.query.resource
        statusType.value = route.query.status
    })

    let activeFilters = computed(() => {
        let result = []
        if (keyword.value?.length) {
            result.push({
                key: 'name',
                value: keyword.value,
                type: 'text'
            })
            router.push({ query: {name: keyword.value }})
        }
        if (owner.value?.length) {
            result.push({
                key: 'owner',
                value: owner.value,
                type: 'text'
            })
            router.push({ query: {owner: owner.value }})
        }
        if (jobId.value?.length) {
            result.push({
                key: 'id',
                value: jobId.value,
                type: 'text'
            })
            router.push({ query: {id: jobId.value }})
        }
        if (jobType.value?.length) {
            result.push({
                key: 'type',
                value: jobType.value,
                type: 'select'
            })
            router.push({ query: {id: jobId.value }})
        }
        if (resourceType.value?.length) {
            result.push({
                key: 'resource',
                value: resourceType.value,
                type: 'select'
            })
            router.push({ query: {resource: resourceType.value }})
        }
        if (dateRange.value?.length) {
            result.push({
                key: 'date',
                value: dateRange.value,
                type: 'text'
            })
            router.push({ query: {date: dateRange.value }})
        }
        if (statusType.value?.length) {
            result.push({
                key: 'status',
                value: statusType.value,
                type: 'select'
            })
            router.push({ query: {status: statusType.value }})
        }
        return result

    })

    function setStatus(status) {
        statusType.value = status
    }

    function setJobType(job) {
        jobType.value = job
    }

    function setResource(resource) {
        console.log(resource)
        resourceType.value = resource
    }

</script>

<template>
    <div class="w-full relative px-8">
        <!-- filters -->
        <div class="">
            <input 
                v-model="keyword"
                class="border-gray-300 border focus:outline-blue-500 p-1 mr-4"
                placeholder="Filter by keyword"/>

            <input 
                v-model="jobId"
                class="border-gray-300 border focus:outline-blue-500 p-1 m-4" 
                placeholder="Job ID" />

            <Dropdown @choose-option="setJobType"
                :options="jobTypes" name="Job Type" select-key="type" class="m-4 w-36" />

            <input 
            v-model="owner"
            class="border-gray-300 border focus:outline-blue-500 p-1 m-4" 
            placeholder="Owner"/>

            <Dropdown @choose-option="setResource"
                :options="resourceTypes" name="Resource Type" select-key="resourceType" class="m-4 w-40" />

            <Dropdown @choose-option="setStatus"
            :options="statusTypes" name="Status" select-key="status" class="m-4 w-36" />
        </div>

        <TableTable :columns="columns" :data="jobs"  :filters="activeFilters" :page-size="pageSize" />

    </div>
</template>
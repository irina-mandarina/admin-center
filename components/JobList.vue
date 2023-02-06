<script setup>
    let jobTypes = ["Upload", "Import", "Export", "Delete", "Shrink", "Alter"]
    let resourceTypes = ["Database", "Profile", "Report", "Exposure set"]
    let statusTypes = ["Success", "Failed", "In progress", "Cancelled"]
    let jobs = [
        {name: "DB1.mdf", id: 12345, type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Cancelled"},
        {name: "DB2.mdf", id: 354534, type: "Shrink", owner: "John Smith", resource: "Database", dateRange: '1/30/2023 - 1/30/2023', status: "Success"},
        {name: "DB3.mdf", id: 453, type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Error"},
        {name: "DB3.mdf", id: 435, type: "Shrink", owner: "John Smitmith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Cancelled"},
        {name: "DB2.mdf", id: 12345345345, type: "Shrink", owner: "John Smith", resource: "Database", dateRange: '1/30/2023 - 1/30/2023', status: "Success"},
        {name: "DB3.mdf", id: 1234345, type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Error"},
        {name: "DB3.mdf", id: 98379, type: "Shrink", owner: "John Smitmith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Cancelled"},
        {name: "DB2.mdf", id: 12345, type: "Shrink", owner: "John Smith", resource: "Database", dateRange: '1/30/2023 - 1/30/2023', status: "Success"},
        {name: "DB3.mdf", id: 45316, type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Error"},
        {name: "DB3.mdf", id: 89484, type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "In progress"},
    ]

    let keyword = ref(null)
    let jobId = ref(null)
    let jobType = ref(null)
    let owner = ref(null)
    let resource = ref(null)
    let status = ref(null)
    let activeFilters = []
    let jobsOnDisplay = computed(() => {
        let result = jobs
        if (activeFilters.includes('name')) {
            result = result.filter(
                (job) => job.name.includes(keyword.value)
            )
            console.log(result)
        }

        if (activeFilters.includes('id')) {
            jobsOnDisplay.value = jobsOnDisplay.value.filter(
                (job) => job.id.toString().includes(jobId.value)
            )
        }

        if (activeFilters.includes('type')) {
            jobsOnDisplay.value = jobsOnDisplay.value.filter(
                (job) => job.type === jobType.value
            )    
        }

        if (activeFilters.includes('owner')) {
            jobsOnDisplay.value = jobsOnDisplay.value.filter(
                (job) => job.owner.includes(owner.value)
            )
        }

        if (activeFilters.includes('resource')) {
            jobsOnDisplay.value = jobsOnDisplay.value.filter(
                (job) => job.resource === resource
            )
        }

        if (activeFilters.includes('status')) { 
            jobsOnDisplay.value = jobsOnDisplay.value.filter(
                (job) => job.status === status
            )
        }

        return result
    })
    
    function filterByJobType(jobTypeArg) {
        activeFilters.push('type')
        jobType.value = jobTypeArg
    }
    
    function filterByResource(resourceArg) {
        activeFilters.push('resource')
        resource.value = resourceArg
    }
    
    function filterByStatus(statusArg) {
        activeFilters.push('status')
        status.value = statusArg
    }
</script>

<template>
    <div class="w-full relative px-8">
        <!-- filters -->
        <div class="">
            <input @keyup.enter="activeFilters.push('name')"
                v-model="keyword"
                class="border-gray-300 border focus:outline-blue-500 p-1 mr-4"
                placeholder="Filter by keyword"/>

            <input @keyup.enter="activeFilters.push('id')" 
                v-model="jobId"
                class="border-gray-300 border focus:outline-blue-500 p-1 m-4" 
                placeholder="Job ID"/>

            <Dropdown @choose-option="filterByJobType"
                :options="jobTypes" name="Job Type" class="m-4 w-36" />

            <input @keyup.enter="activeFilters.push('owner')" 
            class="border-gray-300 border focus:outline-blue-500 p-1 m-4" 
            placeholder="Owner"/>

            <Dropdown @choose-option="filterByResource"
                :options="resourceTypes" name="Resource Type" class="m-4 w-40" />

            <Dropdown @choose-option="filterByStatus"
            :options="statusTypes" name="Status" class="m-4 w-36" />
        </div>

        <table class="w-full table-auto">
            <tr class="border-b-2 border-gray-300 text-left">
                <th class="py-3">
                    Job name
                </th>
                <th class="py-3">
                    Job ID
                </th>
                <th class="py-3">
                    Job Type
                </th>
                <th class="py-3">
                    Owner
                </th>
                <th class="py-3">
                    Resource type
                </th>
                <th class="py-3">
                    Date range
                </th>
                <th class="py-3">
                    Status
                </th>    
            </tr>
            
            <tbody>
                <Job v-for="job in jobsOnDisplay" :job="job" />
            </tbody>
        </table>
        <div class="text-gray-800 p-4">
            Showing {{ jobsOnDisplay.length }} of {{ jobs.length }} items
        </div>
    </div>
</template>
<script setup>
    let jobTypes = ["Upload", "Import", "Export", "Delete", "Shrink", "Alter"]
    let resourceTypes = ["Database", "Profile", "Report", "Exposure set"]
    let statusTypes = ["Success", "Failed", "In progress", "Cancelled"]
    let jobs = [
        {name: "DB1.mdf", id: "12345", type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Cancelled"},
        {name: "DB2.mdf", id: "3549634", type: "Shrink", owner: "John Smith", resource: "Database", dateRange: '1/30/2023 - 1/30/2023', status: "Success"},
        {name: "DB3.mdf", id: "453", type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Error"},
        {name: "DB3.mdf", id: "435", type: "Shrink", owner: "John Smitmith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Cancelled"},
        {name: "DB2.mdf", id: "123445", type: "Shrink", owner: "John Smith", resource: "Database", dateRange: '1/30/2023 - 1/30/2023', status: "Success"},
        {name: "DB3.mdf", id: "19084345", type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Error"},
        {name: "DB3.mdf", id: "98379", type: "Shrink", owner: "John Smitmith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Cancelled"},
        {name: "DB2.mdf", id: "12665", type: "Shrink", owner: "John Smith", resource: "Database", dateRange: '1/30/2023 - 1/30/2023', status: "Success"},
        {name: "DB3.mdf", id: "45316", type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Error"},
        {name: "DB3.mdf", id: "89484", type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "In progress"},
    ]
    let pageNumber = ref(1)
    let pageSize = ref(5)

    let keyword = ref(null)
    let jobId = ref(null)
    let jobType = ref(null)
    let owner = ref(null)
    let resource = ref(null)
    let status = ref(null)
    let activeFilters = ref([])
    let jobsOnDisplay = ref(jobs)
    let sortDirection = ref(null)
    let sortItem = ref(null)
    let jobsPreSort = null
    
    let directionMult = computed (() => {
        if (sortDirection.value === "desc") {
            return -1
        }
        else return 1
    })

    let pageOfJobs = computed(() => {
        return jobsOnDisplay.value.slice((pageNumber.value - 1) *  pageSize.value, ((pageNumber.value - 1) * pageSize.value) * pageSize.value + pageSize.value)
    })

    watch (activeFilters, () => {
        let result = jobs
        if (activeFilters.value.includes('name')) {
            result = result.filter(
                (job) => job.name.toLowerCase().includes(keyword.value.toLowerCase())
            )
        }

        if (activeFilters.value.includes('id')) {
            result = result.filter(
                (job) => job.id.toString().includes(jobId.value)
            )
        }

        if (activeFilters.value.includes('type')) {
            result = result.filter(
                (job) => job.type === jobType.value
            )    
        }

        if (activeFilters.value.includes('owner')) {
            result = result.filter(
                (job) => job.owner.toLowerCase().includes(owner.value.toLowerCase())
            )
        }

        if (activeFilters.value.includes('resource')) {
            result = result.filter(
                (job) => job.resource === resource.value
            )
        }

        if (activeFilters.value.includes('status')) { 
            console.log("filtering by status")
            console.log(status.value)
            result = result.filter(
                (job) => job.status === status.value
            )
        }

        jobsOnDisplay.value = result
        pageNumber.value = 1
    })
    
    function filterByKeyword() {
        if (activeFilters.value.includes('name')) {
            activeFilters.value = activeFilters.value.filter((filter) => filter !== 'name')
        }
        activeFilters.value.push('name')
        // remove filter if input is empty
        if (keyword.value?.length === 0) {
            activeFilters.value = activeFilters.value.filter((filter) => {
                    filter !== 'name'
                }
            )
        }
    }
    
    function filterByJobId() {
        if (activeFilters.value.includes('id')) {
            activeFilters.value = activeFilters.value.filter((filter) => filter !== 'id')
        }
        activeFilters.value.push('id')
        // remove filter if input is empty
        if (jobId.value?.length === 0) {
            activeFilters.value = activeFilters.value.filter((filter) => {
                    filter !== 'id'
                }
            )
        }
    }
    
    function filterByJobType(jobTypeArg) {
        jobType.value = jobTypeArg
        if (activeFilters.value.includes('type')) {
            activeFilters.value = activeFilters.value.filter((filter) => filter !== 'type')
        }
        activeFilters.value.push('type')
    }

    function filterByOwner() {
        if (activeFilters.value.includes('owner')) {
            activeFilters.value = activeFilters.value.filter((filter) => filter !== 'owner')
        }
        activeFilters.value.push('owner')
        // remove filter if input is empty
        if (owner.value?.length === 0) {
            activeFilters.value = activeFilters.value.filter((filter) => {
                    filter !== 'owner'
                }
            )
        }
    }
    
    function filterByResource(resourceArg) {
        resource.value = resourceArg
        if (activeFilters.value.includes('resource')) {
            activeFilters.value = activeFilters.value.filter((filter) => filter !== 'resource')
        }
        activeFilters.value.push('resource')
    }
    
    function filterByStatus(statusArg) {
        status.value = statusArg
        if (activeFilters.value.includes('status')) {
            activeFilters.value = activeFilters.value.filter((filter) => filter !== 'status')
        }
        activeFilters.value.push('status')
    }

    function toggleSortDirection() {
        if (sortDirection.value === null) {
            console.log(jobsOnDisplay.value)
            jobsPreSort = jobsOnDisplay.value
            console.log("Displayed jobs before sorting: ")
            console.log(jobsPreSort)
            sortDirection.value = "asc"
        }
        else if (sortDirection.value === "asc") {
            sortDirection.value = "desc"
        }
        else {
            sortDirection.value = null
            sortItem.value = null
        }
    }

    function sortByName() {
        sortItem.value = "name"
        toggleSortDirection()
        if (sortDirection.value === null) {
            jobsOnDisplay.value = jobsPreSort
        }
        else {
            jobsOnDisplay.value.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1*directionMult.value
                }
                else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1*directionMult.value
                }
                else {
                    return 0
                }
            })
        }
    }
    
    function sortByJobId() {
        sortItem.value = "id"
        toggleSortDirection()
        if (sortDirection.value === null) {
            jobsOnDisplay.value = jobsPreSort
        }
        else {
            jobsOnDisplay.value.sort((a, b) => {
                if (a.id.toLowerCase() < b.id.toLowerCase()) {
                    return -1*directionMult.value
                }
                else if (a.id.toLowerCase() > b.id.toLowerCase()) {
                    return 1*directionMult.value
                }
                else {
                    return 0
                }
            })
        }
    }
    
    function sortByJobType() {
        sortItem.value = "jobType"
        toggleSortDirection()
        if (sortDirection.value === null) {
            jobsOnDisplay.value = jobsPreSort
        }
        else {
            jobsOnDisplay.value.sort((a, b) => {
                if (a.type.toLowerCase() < b.type.toLowerCase()) {
                    return -1*directionMult.value
                }
                else if (a.type.toLowerCase() > b.type.toLowerCase()) {
                    return 1*directionMult.value
                }
                else {
                    return 0
                }
            })
        }
    }

    function sortByOwner() {
        sortItem.value = "owner"
        toggleSortDirection()
        if (sortDirection.value === null) {
            jobsOnDisplay.value = jobsPreSort
        }
        else {
            jobsOnDisplay.value.sort((a, b) => {
                if (a.owner.toLowerCase() < b.owner.toLowerCase()) {
                    return -1*directionMult.value
                }
                else if (a.owner.toLowerCase() > b.owner.toLowerCase()) {
                    return 1*directionMult.value
                }
                else {
                    return 0
                }
            })
        }
    }
    
    function sortByResourceType() {
        sortItem.value = "resourceType"
        toggleSortDirection()
        if (sortDirection.value === null) {
            jobsOnDisplay.value = jobsPreSort
        }
        else {
            jobsOnDisplay.value.sort((a, b) => {
                if (a.resource.toLowerCase() < b.resource.toLowerCase()) {
                    return -1*directionMult.value
                }
                else if (a.resource.toLowerCase() > b.resource.toLowerCase()) {
                    return 1*directionMult.value
                }
                else {
                    return 0
                }
            })
        }
    }
    
    function sortByDateRange() {
        sortItem.value = "dateRange"
        toggleSortDirection()
        if (sortDirection.value === null) {
            jobsOnDisplay.value = jobsPreSort
        }
        else {
            jobsOnDisplay.value.sort((a, b) => {
                if (a.dateRange.toLowerCase() < b.dateRange.toLowerCase()) {
                    return -1*directionMult.value
                }
                else if (a.dateRange.toLowerCase() > b.dateRange.toLowerCase()) {
                    return 1*directionMult.value
                }
                else {
                    return 0
                }
            })
        }
    }
    
    function sortByStatus() {
        sortItem.value = "status"
        toggleSortDirection()
        if (sortDirection.value === null) {
            jobsOnDisplay.value = jobsPreSort
        }
        else {
            jobsOnDisplay.value.sort((a, b) => {
                if (a.status.toLowerCase() < b.status.toLowerCase()) {
                    return -1*directionMult.value
                }
                else if (a.status.toLowerCase() > b.status.toLowerCase()) {
                    return 1*directionMult.value
                }
                else {
                    return 0
                }
            })
        }
    }

    function previousPage() {
        if (pageNumber.value !== 1) {
            pageNumber.value--
        }
    }

    function nextPage() {
        let pages = jobsOnDisplay.value.length / pageSize.value
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
</script>

<template>
    <div class="w-full relative px-8">
        <!-- filters -->
        <div class="">
            <input @keyup.enter="filterByKeyword()"
                v-model="keyword"
                class="border-gray-300 border focus:outline-blue-500 p-1 mr-4"
                placeholder="Filter by keyword"/>

            <input @keyup.enter="filterByJobId()" 
                v-model="jobId"
                class="border-gray-300 border focus:outline-blue-500 p-1 m-4" 
                placeholder="Job ID"/>

            <Dropdown @choose-option="filterByJobType"
                :options="jobTypes" name="Job Type" class="m-4 w-36" />

            <input @keyup.enter="filterByOwner()" 
            v-model="owner"
            class="border-gray-300 border focus:outline-blue-500 p-1 m-4" 
            placeholder="Owner"/>

            <Dropdown @choose-option="filterByResource"
                :options="resourceTypes" name="Resource Type" class="m-4 w-40" />

            <Dropdown @choose-option="filterByStatus"
            :options="statusTypes" name="Status" class="m-4 w-36" />
        </div>

        <table class="w-full table-fixed">
            <tr class="border-b-2 border-gray-300 text-left">
                <th @click="sortByName()" class="py-3">
                    Job name
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 'asc',
                        'fa-chevron-down': sortDirection === 'desc',
                        'invisible': sortDirection === null || sortItem !== 'name'
                    }"/>
                </th>
                <th @click="sortByJobId()" class="py-3">
                    Job ID
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 'asc',
                        'fa-chevron-down': sortDirection === 'desc',
                        'invisible': sortDirection === null || sortItem !== 'id'
                    }"/>
                </th>
                <th @click="sortByJobType()" class="py-3">
                    Job Type
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 'asc',
                        'fa-chevron-down': sortDirection === 'desc',
                        'invisible': sortDirection === null || sortItem !== 'jobType'
                    }"/>
                </th>
                <th @click="sortByOwner()" class="py-3">
                    Owner
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 'asc',
                        'fa-chevron-down': sortDirection === 'desc',
                        'invisible': sortDirection === null || sortItem !== 'owner'
                    }"/>
                </th>
                <th @click="sortByResourceType()" class="py-3">
                    Resource type
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 'asc',
                        'fa-chevron-down': sortDirection === 'desc',
                        'invisible': sortDirection === null || sortItem !== 'resourceType'
                    }"/>
                </th>
                <th @click="sortByDateRange()" class="py-3">
                    Date range
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 'asc',
                        'fa-chevron-down': sortDirection === 'desc',
                        'invisible': sortDirection === null || sortItem !== 'dateRange'
                    }"/>
                </th>
                <th @click="sortByStatus()" class="py-3">
                    Status
                    <i class="fa text-xs" :class="{
                        'fa-chevron-up': sortDirection === 'asc',
                        'fa-chevron-down': sortDirection === 'desc',
                        'invisible': sortDirection === null || sortItem !== 'status'
                    }"/>
                </th>    
            </tr>
            
            <tbody>
                <Job v-for="job in pageOfJobs" :job="job" />
            </tbody>
        </table>
        <div class="text-gray-800 p-4 w-1/2 float-left">
            Showing {{ pageOfJobs.length }} of {{ jobsOnDisplay.length }} items
        </div>
        <div class="inline text-gray-800 p-4 w-1/2 float-right text-right">
            <i @click="previousPage()" class="inline fa fa-chevron-left rounded-full bg-gray-200 p-1 mx-4" />
            {{ pageNumber }}
            <i @click="nextPage()" class="inline fa fa-chevron-right rounded-full bg-gray-200 p-1 mx-4" />
        </div>
    </div>
</template>
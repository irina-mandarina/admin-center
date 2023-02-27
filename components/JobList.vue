<script setup>
    import _debounce from 'lodash/debounce'
    import _pickBy from 'lodash/pickBy'
    import { JobStore } from '~~/stores/JobStore'
    import { JobType } from '~/objects/jobType'
    import { StatusType } from '~/objects/statusType'
    import { ResourceType } from '~/objects/resourceType'

    const jobStore = JobStore()
    jobStore.initJobs()
    let jobs = computed(() => jobStore.jobs)
    let columns = [
        { key: 'name', name:'Job name'},
        { key: 'id', name: 'Job ID'},
        { key: 'type', name: 'Job Type'},
        { key: 'owner', name: 'Owner'},
        { key: 'resource', name: 'Resource Type'},
        { key: 'date', name: 'Date Range'},
        { key: 'status', name: 'Status'}]

    let pageSize = ref(5)

    let activeFilters = ref(null)

    let filters =  reactive({
        name: '',
        id: '',
        owner: '',
        type: '',
        date: '',
        resource: '',
        status: '',
    })

    const router = useRouter()
    const route = useRoute()
    let ok = ref(false)

    let rightSideInfo = ref(null)
    let rightSideTitle = ref(null)
    let focusedJob = ref(null)
    let rightSideDetails = ref(null)

    onBeforeMount(() => {
        filters.name = route.query.name
        filters.owner = route.query.owner
        filters.id = route.query.id
        filters.type = route.query.type
        filters.resource = route.query.resource
        filters.status = route.query.status

        fillActiveFilters()
        ok.value = true
    })

   
    watch(filters, _debounce(() => {
        fillActiveFilters()
    }, 500))

    function fillActiveFilters() {
        let query = {}
        activeFilters.value = []
        for (let filter in _pickBy(filters)) {
            query[filter] = filters[filter]
            let type
            if (['type', 'resource', 'status'].includes(filter)) type = 'dropdown'
            else type = 'text'
            activeFilters.value.push({
                key: filter,
                value: filters[filter],
                type
            })
        }
        console.log(query)
        router.push({query})
    }

    function setStatus(status) {
        filters.status = status
    }

    function setJobType(job) {
        filters.type = job
    }

    function setResource(resource) {
        filters.resource = resource
    }

    function showJobDetails(job) {
        clearJobDetails()
        rightSideTitle.value = "Job ID: " + job.id
        rightSideInfo.value = new Map()
        for (let jobDetail in job) {
            rightSideInfo.value.set(columns.filter((col) => col.key === jobDetail)[0].name, job[jobDetail])
        }
        focusedJob.value = job
        console.log(focusedJob.value)
        if (job.type === JobType.Export) {
            rightSideDetails.value = {
                text: "Download database",
                database: "mydb",
                type: "download"
            }
        }
    }

    function clearJobDetails() {
        rightSideInfo.value = null
        rightSideTitle.value = null
        focusedJob.value = null
        rightSideDetails.value = null
    }

</script>

<template>
    <div class="w-full px-8">
        <!-- filters -->
        <div class="flex justify-between mb-4">
            <input 
                v-model="filters.name"
                class="border-gray-300 border focus:border-blue-500 focus:outline-none p-1 border-box"
                placeholder="Filter by keyword"
                type="search" />

            <input 
                v-model="filters.id"
                class="border-gray-300 border focus:border-blue-500 focus:outline-none p-1 border-box" 
                placeholder="Job ID"
                type="search" />

            <Dropdown @choose-option="setJobType"
                :options="Object.values(JobType)" name="Job Type" :displayOption="filters.type" select-key="type" class=" w-36" />

            <input 
            v-model="filters.owner"
            class="border-gray-300 border focus:border-blue-500 focus:outline-none p-1 border-box" 
            placeholder="Owner"/>

            <Dropdown @choose-option="setResource"
                :options="Object.values(ResourceType)" name="Resource Type" :displayOption="filters.resource" select-key="resourceType" class="w-40" />

            <Dropdown @choose-option="setStatus"
            :options="Object.values(StatusType)" name="Status" :displayOption="filters.status" select-key="status" class="w-36" />
        </div>

        <TableTable v-if="ok" :columns="columns" :data="jobs" :filters="activeFilters" :page-size="pageSize" :focused-row="focusedJob" @show-row-details="showJobDetails" />

    </div>
    
    <!-- <RightSideBar v-if="rightSideTitle !== null" :title="rightSideTitle" :info-map="rightSideInfo" :details="rightSideDetails" @close-bar="clearJobDetails" /> -->
</template>
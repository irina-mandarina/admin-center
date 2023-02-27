<script setup lang="ts">
    const _debounce  = require('lodash/debounce')
    const _pickBy = require('lodash/pickBy')
    const JobStore = require('~~/stores/JobStore')
    const JobType = require('~~/objects/jobType')
    const ResourceType = require('~~/objects/resourceType')
    const StatusType = require('~~/objects/statusType')

    interface Column {
        key: string;
        name: string;
    }

    interface Filter {
        name: string;
        id: string;
        owner: string;
        type: string;
        date: string;
        resource: string;
        status: string;
        [key: string]: string | undefined;
    }

    interface ActiveFilter {
        key: string;
        value: string;
        type: string;
    }

    interface RightSideDetails {
        text: string;
        database: string;
        type: string;
    }

    const jobStore = JobStore()
    

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

    let filters: Filter =  reactive({
        name: '',
        id: '',
        owner: '',
        type: '',
        date: '',
        resource: '',
        status: '',
    })

    let activeFilters = ref<ActiveFilter[] | null>(null)
    
    const router = useRouter()
    const route = useRoute()
    let ok = ref<boolean>(false)

    let rightSideInfo = ref<Map<string, string> | null>(null)
    let rightSideTitle = ref<string | null>(null)
    let focusedJob = ref<Job | null>(null)
    let rightSideDetails = ref<RightSideDetails | null>(null)

    onBeforeMount(() => {
        filters.name = route.query.name?
        filters.owner = route.query.owner?
        filters.id = route.query.id?
        filters.type = route.query.type?
        filters.resource = route.query.resource?
        filters.status = route.query.status?

        fillActiveFilters()
        ok.value = true
    })

   
    watch(filters, _debounce(() => {
        fillActiveFilters()
    }, 500))

    function fillActiveFilters(): void {
        let query: Map<string, string> = new Map<string, string>()
        activeFilters.value = []
        for (let filter: string in _pickBy(filters)) {
            query.set(filter, filters[filter]!)
            let type: string
            if (['type', 'resource', 'status'].includes(filter)) type = 'dropdown'
            else type = 'text'
            activeFilters.value.push({
                key: filter,
                value: filters[filter]!,
                type
            })
        }
        router.push({query})
    }

    function setStatus(status: string): void {
        filters.status = status
    }

    function setJobType(job: string): void {
        filters.type = job
    }

    function setResource(resource: string): void {
        filters.resource = resource
    }

    function showJobDetails(job: Job) {
        clearJobDetails()
        rightSideTitle.value = "Job ID: " + job.id
        rightSideInfo.value = new Map()
        for (let jobDetail in job) {
            rightSideInfo.value.set(columns.filter((col) => col.key === jobDetail)[0].name, job[jobDetail]!)
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

    function clearJobDetails(): void {
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
    
    <RightSideBar v-if="rightSideTitle !== null" :title="rightSideTitle" :info-map="rightSideInfo" :details="rightSideDetails" @close-bar="clearJobDetails" />
</template>
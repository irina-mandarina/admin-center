<script setup>
    let jobTypes = ["Upload", "Import", "Export", "Delete", "Shrink", "Alter"]
    let resourceTypes = ["Database", "Profile", "Report", "Exposure set"]
    let statusTypes = ["Success", "Failed", "In progress", "Cancelled"]
    let jobs = [
        {name: "DB1.mdf", id: 12345, type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Cancelled"},
        {name: "DB2.mdf", id: 12345, type: "Shrink", owner: "John Smith", resource: "Database", dateRange: '1/30/2023 - 1/30/2023', status: "Success"},
        {name: "DB3.mdf", id: 12345, type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "Error"},
        {name: "DB3.mdf", id: 12345, type: "Shrink", owner: "John Smith", resource: "Report", dateRange: '1/30/2023 - 1/30/2023', status: "In progress"},
    ]
</script>

<template>
    <div class="w-full relative px-8">
        <!-- filters -->
        <div class="">
            <input class="border-gray-300 border focus:outline-blue-500 p-1 mr-4" placeholder="Filter by keyword"/>
            <input class="border-gray-300 border focus:outline-blue-500 p-1 m-4" placeholder="Job ID"/>
            <Dropdown :options="jobTypes" :name="'Job Type'" class="m-4 w-36" />
            <input class="border-gray-300 border focus:outline-blue-500 p-1 m-4" placeholder="Owner"/>
            <Dropdown :options="resourceTypes" :name="'Resource Type'" class="m-4 w-40" />
            <Dropdown :options="statusTypes" :name="'Status'" class="m-4 w-36" />
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
                <Job v-for="job in jobs" :job="job" />
            </tbody>
        </table>
        <div class="text-gray-800 p-4">
            Showing 3 of 3 items
        </div>
    </div>
</template>
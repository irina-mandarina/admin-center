<script setup>
    let jobTypes = ["Upload", "Import", "Export", "Delete", "Shrink", "Alter"]
    let resourceTypes = ["Database", "Profile", "Report", "Exposure set"]
    let statusTypes = ["Success", "Failed", "In progress", "Cancelled"]
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
            <Dropdown :options="statusTypes" :name="'Status Type'" class="m-4 w-36" />
        </div>

        <table class="w-full">
            <tr class="border-b text-left">
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
                <Job />
                <Job />
                <Job />
            </tbody>
        </table>
        <div class="text-gray-800 p-4">
            Showing 3 of 3 items
        </div>
    </div>
</template>
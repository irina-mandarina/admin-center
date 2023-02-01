<script setup>
    let servers = ref(["Val's server"])
</script>
<template>
    <NuxtLayout name="default">
        <div class="w-5/6 absolute right-0">
            <div class="h-18 ">
                <div class="border-b w-full p-5 shadow-inner bg-slate-50 flex">
                    <i class="fa-solid fa-arrow-left text-blue-700 mx-4" />

                    <!-- server picker -->
                    <div class="mr-6 w-1/3">
                        <Dropdown :options="servers" :name="'Servers'" class="w-5/6" />
                        <i class="fa-solid fa-copy mx-2" />
                    </div>

                    <!-- nav -->
                    <ul class="flex text-sm font-bold text-gray-700 w-1/3">
                        <li class="mx-2 border-gray-500" :class="{
                            'border-b-2': 0,
                        }">
                                Databases
                        </li> 
                        <li class="mx-2 border-gray-500" :class="{
                            'border-b-2': 0,
                        }">
                                Logins
                        </li>
                        <li class="mx-2 border-gray-500" :class="{
                            'border-b-2': 1,
                        }">
                                Jobs
                        </li>
                    </ul>

                    <!-- storage used -->
                    <div class="w-1/2 text-xs text-gray-500 font-bold float-right text-right">
                        <span class="text-purple-600 text-lg">
                            <i class="fa-solid fa-server" />
                            699 GB
                        </span>
                        / 700 GB
                    </div>
                </div>
            </div>

            <span class="font-bold text-lg px-8 pt-8 pb-2 block">
                Jobs
            </span>

            <JobList />    
        </div>
        
    </NuxtLayout>
</template>
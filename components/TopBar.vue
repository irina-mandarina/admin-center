<template>
    <div class="absolute t-0 flex w-full">
        <div class="w-1/6">

        </div>
        <div class="w-5/6">

            <div class="border-b text-xl font-bold w-full p-5">
                Data bridge
            </div>

            
            <div class="border-b w-full p-5 shadow-inner bg-slate-50 flex">
                <i class="fa-solid fa-arrow-left text-blue-700 mx-4" />

                <!-- server picker -->
                <div class="mr-6">
                    <select class="focus-outline-none text-md ">
                        <option>
                            Val's server
                        </option>
                    </select>
                    <i class="fa-solid fa-copy mx-2" />
                </div>
                <!-- nav -->
                <ul class="flex text-sm font-bold text-gray-700">
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
                <div class="">
                    <span class="text-purple-600">
                        699 GB
                        <i class="fa-solid fa-server" />
                    </span>
                     / 700 GB
                </div>
            </div>
        </div>
    </div>
</template>
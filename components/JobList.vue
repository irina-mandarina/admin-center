<template>
    <div class="w-full">
        <div>
            Jobs
        </div>
        <!-- filters -->
        <div>
            <input />
            <input />
            <input />
            <select></select>
            <select></select>
        </div>

        <table>
            <th>
                Job name
            </th>
            <th>
                Job ID
            </th>
            <th>
                Job Type
            </th>
            <th>
                Owner
            </th>
            <th>
                Resource type
            </th>
            <th>
                Date range
            </th>
            <th>
                Status
            </th>
            <tbody>
                <Job />
                <Job />
                <Job />
            </tbody>
        </table>
        <div class="text-gray-800">
            Showing 3 of 3 items
        </div>
    </div>
</template>
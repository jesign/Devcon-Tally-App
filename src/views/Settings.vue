<template>
    <b-list-group class="mt-3">
        <b-list-group-item><router-link to="event">Event Details</router-link></b-list-group-item>
        <b-list-group-item><router-link to="set-participants">Set Participants</router-link></b-list-group-item>
        <b-list-group-item><router-link to="set-criteria">Set Criteria</router-link></b-list-group-item>
    </b-list-group>
</template>

<script>
    export default {
        name: 'settings.vue',

        created() {
            console.log('settings loaded')
        }
    }
</script>

<style scoped>

</style>
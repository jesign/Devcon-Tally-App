<template>
    <b-form @submit.prevent="onSubmit" class="mt-2">
        <b-form-group
            id="input-group-1"
            label="Event Name"
            label-for="title"
        >
            <b-form-input
                id="title"
                v-model="form.title"
                type="text"
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Description" label-for="description">
            <b-form-textarea
                id="description"
                v-model="form.description"
            ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="info">Submit</b-button>
    </b-form>

</template>

<script>
    export default {
        name: 'event-form.vue',
        data: function(){
            return {
                form: {}
            }
        },
        methods: {
            onSubmit(){
                this.$router.push({
                    name: 'Settings',
                })
            }
        },
        mounted(){
            this.form = this.$store.state.event
        }
    }
</script>

<style scoped>

</style>
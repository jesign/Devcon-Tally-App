<template>
    <b-form @submit.prevent="onSubmit" class="mt-2">
        
        <div class="mb-5">
            <b-button-group>
                <b-button 
                    @click.prevent="$router.push('set-participants')" 
                    variant="outline-primary" 
                    size="sm">
                    View Participants
                </b-button>
                <b-button 
                    @click.prevent="$router.push('set-criteria')" 
                    variant="outline-info" 
                    size="sm">
                    View Criteria
                </b-button>
            </b-button-group>
        </div>
        
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

        <b-button 
            type="submit" 
            variant="success" 
            class="mr-1 float-right">
            Submit
        </b-button>

        <b-button 
            @click.prevent="deleteEvent(form.id)" 
            variant="outline-danger"
            size="sm">
            Delete
        </b-button>
    </b-form>

</template>

<script>
    export default {
        name: 'event-form.vue',
        data: function(){
            return {
                api : RestApiHandler.setService('/api/events'),
                form: {}
            }
        },
        methods: {
            onSubmit(){
                this.api.save(this.form).then(response => {
                    this.$router.push('events')
                });
            },

            deleteEvent(id) {
                this.api.delete(id).then(response => {
                    this.$router.push('events')
                });
            }
        },
        mounted(){
            this.form = this.$store.getters.event;
            this.$store.commit('setBackUrl', '/events');
        }
    }
</script>

<style scoped>

</style>
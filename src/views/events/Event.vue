<template>
    <div>
        <b-row>
            <b-col>
                <b-dropdown class="mx-1 float-right mt-2 settings" right variant="light">
                    <template slot="button-content">
                        <font-awesome-icon icon="cog"></font-awesome-icon>
                    </template>
                    <b-dropdown-item @click.prevent="$router.push('set-participants')" variant="outline-primary">Participants</b-dropdown-item>
                    <b-dropdown-item @click.prevent="$router.push('set-criteria')">Criteria</b-dropdown-item>
                    <b-dropdown-item @click.prevent="$router.push('set-judges')">Judges</b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
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
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import _isEmpty from 'lodash/isEmpty'

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
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this record",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.api.delete(id).then(response => {
                            swal("Event has been deleted!", {
                                icon: "success",
                            });
                            this.$router.push('events')
                        });
                        
                    } 
                });
            }
        },
        mounted(){
            this.form = this.$store.getters.event;
    
            if (_isEmpty(this.form)) {
               this.$router.push('/events') 
            }

            this.$store.commit('setBackUrl', '/events');
        }
    }
</script>

<style scoped>
    .settings .btn.btn-outline-secondary{
        border: 0 none;
    }
</style>
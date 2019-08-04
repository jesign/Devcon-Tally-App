<template>
    <b-row>
        <b-col>
            <b-modal :visible="showForm" hide-footer @hide="showForm = false; form = {}" title="Create event" v-if="isAdmin">
                <b-form @submit.prevent="saveEvent()">
                    <b-form-group label="Title">
                        <b-input v-model="form.title"></b-input>
                    </b-form-group>
                    <b-form-group label="Description">
                        <b-textarea v-model="form.description"></b-textarea>
                    </b-form-group>
                    <b-button block variant="success" type="submit">Save</b-button>
                </b-form>
            </b-modal>
            <b-row class="mt-2" v-if="isAdmin">
                <b-col>
                    <b-button class="float-right" variant="info" @click="showForm = true" squared><i class="fas fa-plus"></i>Create Event</b-button>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <h1 class="h3 mt-3 mb-3">Events</h1>
                    <b-card
                        v-for="event in events"
                        no-body
                        class="mt-2"
                        @click.prevent="chooseEvent(event)"
                    >
                        <b-card-body>
                            <h4>
                                <a v-text="event.title"></a>
                            </h4>
                            <b-card-text>
                                <p class="card-text">{{ event.description }}</p>
                            </b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
    import axios from 'axios'
    import AuthService from '../../services/AuthService'

    export default {
        name: 'events.vue',
        data: function(){
            return {
                api : RestApiHandler.setService('/api/events'),
                showForm: false,
                form: {},
                events: [],
                isAdmin: AuthService.isAdmin()
            }
        },
        methods: {
            chooseEvent(event){
                this.$store.commit('setEvent', event)
                this.$router.push({
                    name: 'Event'
                });
            },

            getEvents(){
                this.api.index().then(response => {
                    console.log(response)
                    this.events = response.data
                });
            },

            saveEvent(){
                this.api.save(this.form).then(response => {
                    this.getEvents()
                    this.showForm = false;
                    this.form = {};
                });
            },
        },
        created(){
            this.getEvents()

            console.log('events')
        }
    }
</script>

<style scoped>

</style>
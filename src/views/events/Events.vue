<template>
    <b-row>
        <b-col>
            <b-modal :visible="showForm" hide-footer @hide="showForm = false; form = {}" title="Create event">
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
            <b-row class="mt-2">
                <b-col>
                    <b-button class="float-right" variant="success" @click="showForm = true">Create Event</b-button>
                </b-col>
            </b-row>
            <b-card
                v-for="event in events"
                no-body
                class="mt-2"
            >
                <b-card-body>
                    <a @click.prevent="chooseEvent(event)">
                        <h4>{{ event.title }}</h4>
                    </a>
                    <b-card-text>
                        <p class="card-text">{{ event.description }}</p>
                    </b-card-text>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import RouteApiService from '../../services/RestApiService'
    import axios from 'axios'

    export default {
        name: 'events.vue',
        data: function(){
            return {
                api : null,
                showForm: false,
                form: {},
                events: []
            }
        },
        methods: {
            chooseEvent(event){
                this.$store.commit('setEvent', event)
                this.$router.push('event');gst
            },

            getEvents(){
                this.api.index().then(response => {
                    console.log(response)
                    this.events = response.data
                });
            },

            saveEvent(){
                // console.log(this.api)
                this.api.save(this.form).then(response => {
                    this.getEvents()
                })

                // axios.post(process.env.VUE_APP_API_URL + '/api/events', {
                //     title: 'asf'
                // }).then(response => {
                //     console.log(response)
                // })
            }
        },
        created(){
            this.api = new RouteApiService('/api/events')
            this.getEvents()
        }
    }
</script>

<style scoped>

</style>
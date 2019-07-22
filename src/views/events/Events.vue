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
                    <h4>
                        <a @click.prevent="chooseEvent(event)">{{ event.title }}</a>
                    </h4>
                    <b-card-text>
                        <p class="card-text">{{ event.description }}</p>
                    </b-card-text>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'events.vue',
        data: function(){
            return {
                api : RestApiHandler.setService('/api/events'),
                showForm: false,
                form: {},
                events: []
            }
        },
        methods: {
            chooseEvent(event){
                this.$store.commit('setEvent', event)
                this.$router.push('event');
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
        }
    }
</script>

<style scoped>

</style>
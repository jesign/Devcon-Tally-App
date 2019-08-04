<template>
    <b-row>
        <b-col>
            <b-modal :visible="showParticipantForm" @hide="showParticipantForm = false" hide-footer hide-header-close>
                <b-form @submit.prevent="saveParticipant">
                    <b-form-input v-model="participantForm.name" placeholder="Name"></b-form-input>

                    <b-button type="submit" class="float-right mt-2" variant="info">Save</b-button>
                    <b-button @click="showParticipantForm = false" class="float-right m-2" variant="light">Cancel</b-button>
                </b-form>
            </b-modal>
            
            <b-row>
                <b-col>
                    <b-button @click="$router.push('event');" variant="outline-secondary" size="sm" class="my-2 float-left">< Back to Event</b-button>
                    <b-button @click="showParticipantForm = true; participantForm = {}" variant="info" size="sm" class="my-2 float-right">Add Participant</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h1 class="h3 mt-5">Participants</h1>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-card v-for="participant in participants" :sub-title="participant.name">
                        <b-button @click="showParticipantForm = true; participantForm = participant" variant="info" size="sm" class="mr-3">Edit</b-button>
                        <b-button @click="deleteParticipant(participant.id)" variant="danger" size="sm">Delete</b-button>
                    </b-card>
                </b-col>
            </b-row>

        </b-col>
    </b-row>
</template>

<script>
    import _isEmpty from 'lodash/isEmpty'

    export default {
        name: 'participants',
        data: function () {
            return {
                api: RestApiHandler.setService('/api/events/'+this.$store.getters.event.id+'/participants'),
                showParticipantForm: false,
                participantForm: {},
                participants: []
            }
        },
        created() {
            if (_isEmpty(this.$store.getters.event)) {
               this.$router.push('/events') 
            } else {
                this.getParticipants();
            }
        },
        methods: {
            saveParticipant(){
                this.api.save(this.participantForm).then(response => {
                    this.getParticipants()
                    this.showParticipantForm = false;
                    this.participantForm = {}
                });
            },

            getParticipants(){
                this.api.index().then(response => {
                    this.participants = response.data
                });
            },

            deleteParticipant(id) {
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
                            swal("Participant has been deleted!", {
                                icon: "success",
                            });
                            this.$router.push('set-participants')
                            this.getParticipants();
                        });
                        
                    } 
                });
            }
        }
    }
</script>

<style scoped>

</style>
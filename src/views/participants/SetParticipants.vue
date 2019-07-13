<template>
    <b-row>
        <b-col>
            <b-modal :visible="showParticipantForm" @hide="showParticipantForm = false" hide-footer hide-header-close>
                <b-form>
                    <b-form-input v-model="participantForm.name" placeholder="Name"></b-form-input>

                    <b-button @click="saveParticipant" class="float-right mt-2" variant="info">Save</b-button>
                    <b-button @click="showParticipantForm = false" class="float-right m-2" variant="light">Cancel</b-button>
                </b-form>
            </b-modal>
            <b-button @click="showParticipantForm = true; participantForm = {}" variant="info" size="sm" class="my-2 float-right">Add Participant</b-button>
            <b-table striped hover :items="participants" :fields="fields">
                <template slot="action" slot-scope="data">
                    <b-button @click="showParticipantForm = true; participantForm=data.item" variant="info" class="float-right" size="sm">Edit</b-button>
                </template>
            </b-table>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: 'participants',
        data: function () {
            return {
                fields :[
                    'name',
                    { key: 'action', label: '' },
                ],

                showParticipantForm: false,
                participantForm: {},
                participants: [
                    {id: 1, name: 'Team 1'},
                    {id: 2, name: 'Team 2'},
                    {id: 3, name: 'Team 3'},
                    {id: 4, name: 'Team 4'},
                ]
            }
        },
        methods: {
            saveParticipant(){
                this.showParticipantForm = false
            }
        }
    }
</script>

<style scoped>

</style>
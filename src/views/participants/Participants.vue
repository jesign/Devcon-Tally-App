<template>
    <b-row>
        <b-col>
            <b-table striped hover :items="participants" :fields="fields">
                <template slot="name" slot-scope="data">
                     {{data.item.name}} <font-awesome-icon v-show="data.item.scoreSummary.tallied" class="text-success" icon="check"></font-awesome-icon>
                </template>
                <template slot="action" slot-scope="data">
                    <b-button @click="tally(data.item.id);" variant="info" class="float-right" size="sm">Tally</b-button>
                </template>
            </b-table>
        </b-col>
    </b-row>
</template>

<script>
    import _isEmpty from 'lodash/isEmpty'
    import ScoringService from '../../services/ScoringService'

    export default {
        name: 'participants',
        data: function () {
            return {
                api: RestApiHandler.setService('/api/events/'+this.$store.getters.event.id+'/participants'),
                fields: [
                    'name',
                    { key: 'action', label: '' }

                ],
                participants: []
            }
        },

        methods: {
            tally(id){
                this.$router.push('/participants/' + id + '/tally')
            },
            getParticipants() {

                ScoringService.getAllParticipantsScores(this.$store.getters.event.id).then(response => {
                    this.participants = response.data
                });
            }
        },
        created() {
            if (_isEmpty(this.$store.getters.event)) {
                this.$router.push('/events') 
            } else {
                this.getParticipants();
            }

        }
    }
</script>

<style scoped>

</style>
<template>
    <b-form @submit.prevent="saveScore">
        <b-table :fields="fields" :items="criteria">
            <template slot="name" slot-scope="data">
                {{data.item.name}} ({{data.item.percentage }}%)
            </template>
            <template slot="score" slot-scope="data">
                <b-input type="number" v-model="scores['criteria_' + data.item.id]" class="d-inline w-50" :max="data.item.max_points"></b-input> / {{data.item.max_points}}
            </template>
        </b-table>
        <b-button @click.prevent="$router.push('/participants'); $store.commit('setParticipantId', null)">Back</b-button>
        <b-button type="submit" variant="info" class="float-right d-block">Save</b-button>
    </b-form>
</template>

<script>
    export default {
        name: 'tally',
        data: function(){
            return {
                api: {
                    criteria: RestApiHandler.setService('/api/events/'+this.$store.getters.event.id+'/criteria'),
                },
                fields: {
                    name,
                    score: {
                        thStyle: {
                            width: '40%'
                        }
                    }
                },
                criteria: [],
                scores: []
            }
        },
        created() {  
            if (!this.$store.getters.participantId) {
                swal({
                    title: 'No Participant Selected',
                    icon: 'warning'
                });

                this.$router.push('/participants');
            }

            this.getCritera();
        },
        methods: {
            getCritera(){
                this.api.criteria.index().then(response => {
                    this.criteria = response.data
                });
            },
            saveScore(){
                let tallyForm = [];

                this.criteria.forEach(criterion => {
                    tallyForm.push({
                        participant_id: this.$store.getters.participantId,
                        criteria_id: criterion.id,
                        score: this.scores['criteria_' + criterion.id]
                    })
                });

                console.log(tallyForm);
            },
        },
    }
</script>

<style scoped>

</style>
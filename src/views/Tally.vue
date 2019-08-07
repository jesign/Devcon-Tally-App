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
        <b-button @click.prevent="$router.push('/participants');">Back</b-button>
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
                    tally: RestApiHandler.setService('/api/participants/'+this.$route.params.id+'/tally'),
                    scores: RestApiHandler.setService('/api/participants/'+this.$route.params.id+'/scores')
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
                scores: {}
            }
        },
        created() {
            this.getCritera();
            this.getScores();
        },
        methods: {
            getCritera(){
                this.api.criteria.index().then(response => {
                    this.criteria = response.data
                });
            },
            getScores() {
                this.api.scores.index().then(response => {
                    response.data.scores.forEach(tally => {
                        this.$set(this.scores, 'criteria_'+tally.criteria_id, tally.tally);
                    });
                });
            },
            saveScore(){
                let tallyForm = {
                    scores: []
                };

                this.criteria.forEach(criterion => {
                    tallyForm.scores.push({
                        participant_id: this.$route.params.id,
                        criteria_id: criterion.id,
                        score: this.scores['criteria_' + criterion.id]
                    })
                });

                this.api.tally.save(tallyForm).then(response => {
                    // this.getScores()
                }).catch(error => {
                    swal({
                        icon: 'warning',
                        text: 'Failed to save score'
                    });
                });
            },
        },
    }
</script>

<style scoped>

</style>
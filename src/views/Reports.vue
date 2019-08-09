<template>
    <div>
        <b-row>
            <b-col>
                <h4 class="mt-2 float-left">Overall Scores</h4>
                <b-button @click.prevent="print" variant="success" class="print float-right mt-2">Print All</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-table class="mt-1 mb-5" :fields="fieldsTotalScores" :items="participantScores"></b-table>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div v-for="participant in participantsDisplay" class="mb-4">
                    <h4>{{ participant.name }}</h4>
                    <b-table v-if="participant.scores.length > 0" class="mt-1" :fields="participantsScoreFields" :items="participant.scores">
                        <template slot="tallySummary" slot-scope="data">
                            <span v-html="data.value"></span>
                        </template>
                    </b-table>
                    <b-alert show v-if="!participant.scores.length" variant="warning">No Scores yet</b-alert>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import _forEach from 'lodash/forEach'

    export default {
        name: 'reports',
        data: function() {
            return {
                api: {
                    participantsScores: RestApiHandler.setService('/api/events/' + this.$store.getters.event.id + '/participants-scores'),
                    criteria: RestApiHandler.setService('/api/events/'+this.$store.getters.event.id+'/criteria'),
                    eventJudges: RestApiHandler.setService('/api/events/' + this.$store.getters.event.id + '/judges'),
                },
                participantScores: [],
                participantsDisplay: [],
                criteria: [],
                eventJudges: [],
                fields: [
                    { key: 'name' },
                    { key: 'scoreSummary', label: 'scoreSummary'},
                    { key: 'totalScore', label: 'totalScore'},
                ],
                participantsScoreFields: [
                    { key: 'judgeName', label: 'Judge Name' },
                    { key: 'tallySummary', label: 'Tally Summary' },

                ],
                fieldsTotalScores: [
                    { key: 'name', label: 'Participant Name' },
                    { key: 'totalScore', label: 'Total Score'},
                ]
            }
        },
        created () {
            this.getParticipantsScores();
        },
        methods: {
            print() {
                window.print()
            },
            getParticipantsScores() {
                this.api.participantsScores.index().then(async response => {
                    this.participantScores = response.data;

                    await this.api.criteria.index().then(response => {
                        this.criteria = response.data
                    });

                    await this.api.eventJudges.index().then(response => {
                        this.eventJudges = response.data
                    });

                    this.arrangeParticipantsScoreFields()
                });
            },
            arrangeParticipantsScoreFields() {
                _.forEach(this.participantScores, (item) => {
                    const fakeFields = {
                        id: item.id,
                        name: item.name,
                        scores: []
                    };
                    _.forEach(this.eventJudges, (judge) => {
                        if (item.scoreSummary[judge.name]) {
                            let tallies = item.scoreSummary[judge.name].tallies;
                            let tallySummary = '';

                            _.forEach(tallies, (tally) => {
                                tallySummary += tally.criteria_name + " " + tally.criteria_percentage + "%" + ": " + tally.tally + "/" + tally.criteria_max_tally + "<br>";
                            });

                            fakeFields.scores.push({
                                judgeName: judge.name,
                                tallySummary: tallySummary
                            });
                        }
                    });

                    this.participantsDisplay.push(fakeFields);
                });

                console.log(this.participantsDisplay)
            }
        },
    }
</script>

<style scoped>
    @media print {
        .print {
            display: none;
        }
    }
</style>
<template>
    <div id="report-page">
        <b-row>
            <b-col>
                <pie-chart :chartData="chartData"></pie-chart>
            </b-col>
        </b-row>
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
                <div v-for="participant in participantsDisplay" class="mb-4 d-none d-sm-block">
                    <h4>{{ participant.name }}</h4>
                    <b-table v-if="participant.scores.length > 0" class="mt-1" :fields="participantsScoreFields" :items="participant.scores">
                        <template slot="tallySummary" slot-scope="data">
                            <span v-html="data.value"></span>
                        </template>
                    </b-table>
                    <b-alert show v-if="!participant.scores.length" variant="warning">No Scores yet</b-alert>
                    <hr>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div v-for="participant in participantsDisplay" class="mb-4 d-block d-sm-none">
                    <h4>{{ participant.name }}</h4>
                    <b-table stacked v-if="participant.scores.length > 0" class="mt-1" :fields="participantsScoreFields" :items="participant.scores">
                        <template slot="tallySummary" slot-scope="data">
                            <span v-html="data.value"></span>
                        </template>
                    </b-table>
                    <b-alert show v-if="!participant.scores.length" variant="warning">No Scores yet</b-alert>
                    <hr>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import PieChart from '../charts/PieChart'
    import _forEach from 'lodash/forEach'

    export default {
        name: 'reports',
        components: {
            PieChart
        },
        data: function() {
            return {
                api: {
                    participantsScores: RestApiHandler.setService('/api/events/' + this.$store.getters.event.id + '/participants-scores'),
                    eventJudges: RestApiHandler.setService('/api/events/' + this.$store.getters.event.id + '/judges'),
                    criteria: RestApiHandler.setService('/api/events/'+this.$store.getters.event.id+'/criteria'),
                },
                participantScores: [],
                participantsDisplay: [],
                eventJudges: [],
                fields: [
                    { key: 'name' },
                    { key: 'scoreSummary', label: 'scoreSummary'},
                    { key: 'totalScore', label: 'totalScore'},
                ],
                participantsScoreFields: [
                    { key: 'judgeName', label: 'Judge Name' },
                    { key: 'tallySummary', label: 'Summary' },

                ],
                fieldsTotalScores: [
                    { key: 'name', label: 'Participant Name' },
                    { key: 'totalScore', label: 'Total Score'},
                ],
                loaded: false,
                chartData: {
                    labels: [],
                    datasets: [
                        {
                            label: "Criteria",
                            backgroundColor: [],
                            data: []
                        }
                    ]
                }
            }
        },
        created () {
            this.getParticipantsScores();
            this.getCriteria();
        },
        methods: {
            print() {
                window.print()
            },
            getCriteria() {
                this.api.criteria.index().then(response => {
                    let criteria = response.data
                    
                    let labels = [];
                    let backgroundColor = [];
                    let data = [];

                    _.forEach(response.data, (criterion) => {
                        labels.push(criterion.name);
                        backgroundColor.push('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));
                        data.push(criterion.percentage)
                    });

                    this.$set(this.chartData, {
                        labels: labels,
                        datasets: [{
                            label: "Criteria",
                            data: data,
                            backgroundColor: backgroundColor
                        }]
                    })
                    this.loaded = true;

                });
            },
            getParticipantsScores() {
                this.api.participantsScores.index().then(async response => {
                    this.participantScores = response.data;

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
                                tallySummary += tally.criteria_name + " (" + tally.criteria_percentage + "%)" + ": <strong>" + tally.tally + "/" + tally.criteria_max_tally + "</strong><br>";
                            });

                            fakeFields.scores.push({
                                judgeName: judge.name,
                                tallySummary: tallySummary
                            });
                        }
                    });

                    this.participantsDisplay.push(fakeFields);
                });
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
<style>
    #report-page td[role='cell']::before {
        text-align: left;
    }
</style>
<template>
    <div>
        <b-row>
            <b-col>
                <h3 class="my-2">Leaderboard</h3>
                <bar-chart v-if="loaded"
                            :chartdata="chartdata"
                            :options="options"></bar-chart>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import BarChart from '../../charts/BarChart'
    import axios from 'axios'
    import _forEach from 'lodash/forEach'
    import ScoringService from '../../services/ScoringService'

    export default {
        name: 'leaderboard',
        components : {BarChart},
        data: () => ({
            loaded: false,
            chartdata: null,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            mirror: true
                        },
                        maxBarThickness	: 25,
                    }],
                },

                responsive: true,
            }
        }),
        async mounted () {
            this.loaded = false

            ScoringService.getAllParticipantsScores(this.$store.getters.event.id)
                .then(response => {
                    let labels = [];
                    let data = [];

                    _forEach(response.data, (value) => {
                        console.log(value)
                        labels.push(value.name)
                        data.push(value.totalScore)
                    })

                    this.chartdata = {
                        labels: labels,
                        datasets: [{
                            label: 'Overall Scores',
                            data: data,
                            borderWidth: 1,
                            backgroundColor: '#49a7aa55'
                        }]
                    }
                    console.log(this.chartdata)
                    this.loaded = true
                });
        },
        methods: {
            
        },
    }
</script>

<style scoped>

</style>
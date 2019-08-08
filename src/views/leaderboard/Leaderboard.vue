<template>
    <b-row>
        <b-col>
            <h3 class="my-2">Leaderboard</h3>
            <bar-chart v-if="loaded"
                        :chartdata="chartdata"
                        :options="options"></bar-chart>
        </b-col>
    </b-row>
</template>

<script>
    import BarChart from '../../charts/BarChart'
    import axios from 'axios'
    import _forEach from 'lodash/forEach'

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
                            beginAtZero: true
                        }
                    }]
                }
            }
        }),
        async mounted () {
            this.loaded = false

            axios.get(process.env.VUE_APP_API_URL + '/api/events/' + this.$store.getters.event.id + '/participants-scores')
                .then(response => {
                    console.log(response.data)
                    let labels = [];
                    let data = [];
                    let backgroundColor = []

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
                            backgroundColor: '#17a2b8',
                            borderWidth: 1
                        }]
                    }
                    console.log(this.chartdata)
                    this.loaded = true
                })
        }
    }
</script>

<style scoped>

</style>
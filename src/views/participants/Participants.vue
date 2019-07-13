<template>
    <b-row>
        <b-col>
            <b-table striped hover :items="participants" :fields="fields">
                <template slot="action" slot-scope="data">
                    <b-button @click="tally(data.item.id)" variant="info" class="float-right" size="sm">Tally</b-button>
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
                    { key: 'action', label: '' }

                ],
                participants: [
                    {id: 1, name: 'Team 1'},
                    {id: 2, name: 'Team 2'},
                    {id: 3, name: 'Team 3'},
                    {id: 4, name: 'Team 4'},
                ]
            }
        },
        methods: {
            tally(id){
                this.$router.push('/participants/' + id + '/tally')
            }
        }
    }
</script>

<style scoped>

</style>
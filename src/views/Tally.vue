<template>
    <b-form @click.prevent="">


        <b-table :fields="fields" :items="criteria">
            <template slot="name" slot-scope="data">
                {{data.item.name}} ({{data.item.percentage }}%)
            </template>
            <template slot="score" slot-scope="data">
                <b-input type="number" class="d-inline w-50" :max="data.item.max_points"></b-input> / {{data.item.max_points}}
            </template>
        </b-table>
        <b-button type="submit" variant="info" class="float-right d-block">Save</b-button>
    </b-form>
</template>

<script>
    export default {
        name: 'tally',
        data: function(){
            return {
                fields: {
                    name,
                    score: {
                        thStyle: {
                            width: '40%'
                        }
                    }
                },
                criteria: [
                    {id: 1, name: 'Relevance', percentage: 30, max_points: 10},
                    {id: 2, name: 'Effectiveness', percentage: 40, max_points: 15},
                    {id: 3, name: 'Efficiency', percentage: 20, max_points: 15},
                    {id: 4, name: 'Impact', percentage: 10, max_points: 20},
                ]
            }
        }
    }
</script>

<style scoped>

</style>
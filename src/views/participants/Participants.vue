<template>
    <b-row>
        <b-col>
            <b-table striped hover :items="participants" :fields="fields">
                <template slot="action" slot-scope="data">
                    <b-button @click="tally(data.item.id);" variant="info" class="float-right" size="sm">Tally</b-button>
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
                this.api.index().then(response => {
                    this.participants = response.data
                });
            }
        },
        created() {
            this.getParticipants();
        }
    }
</script>

<style scoped>

</style>
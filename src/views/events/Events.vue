<template>
    <b-row>
        <b-col>
            <b-card
                v-for="event in events"
                no-body
                class="mt-2"
            >
                <b-card-body>
                    <a @click.prevent="chooseEvent(event)">
                        <h4>{{ event.title }}</h4>
                    </a>
                    <b-card-text>
                        <p class="card-text">{{ event.description }}</p>
                    </b-card-text>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import RouteApiService from '../../services/RestApiService'

    export default {
        name: 'events.vue',
        data: function(){
            return {
                api : null,
                events: [
                    {id: 1, title: 'UIC Campus Devcon', description: 'lorem ipsum dolor sit amet'},
                    {id: 2, title: 'ADDU Campus Devcon', description: 'lorem ipsum dolor sit amet'},
                    {id: 3, title: 'USEP Campus Devcon', description: 'lorem ipsum dolor sit amet'}
                ]
            }
        },
        methods: {
            chooseEvent(event){
                this.$store.commit('setEvent', event)
                this.$router.push('event');
            },

            getEvents(){
                this.api.index().then(response => {
                    console.log(response)
                });
            }
        },
        created(){
            this.api = new RouteApiService('/api/events')
            this.getEvents()
        }
    }
</script>

<style scoped>

</style>
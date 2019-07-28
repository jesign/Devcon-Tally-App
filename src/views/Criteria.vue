<template>
    <div>
    <b-row>
        <b-col>
            <b-modal :visible="showCriteriaForm" @hide="showCriteriaForm = false" hide-footer hide-header-close>
                <b-form @submit.prevent="saveCriterion">
                    <b-form-group id="name" label="Name" label-for="input-2">
                        <b-form-input required v-model="criteriaForm.name" class="mt-2" placeholder="Name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="max_points" label="Max Points" label-for="input-2">
                        <b-form-input required type="number" v-model="criteriaForm.max_points" class="mt-2" placeholder="Max Points"></b-form-input>
                    </b-form-group>
                    <b-form-group id="percentage" label="Percentage" label-for="input-2">
                        <b-form-input required type="number" v-model="criteriaForm.percentage" class="mt-2" placeholder="Percentage"></b-form-input>
                    </b-form-group>

                    <b-button type="submit" class="float-right mt-2" variant="info">Save</b-button>
                    <b-button @click="showCriteriaForm = false" class="float-right m-2" variant="light">Cancel</b-button>
                </b-form>
            </b-modal>
            <b-row>
                <b-col>
                    <b-button @click="criteriaForm = {}; $router.push('event')" variant="outline-secondary" size="sm" class="my-2 float-left">< Back to Event</b-button>
                    <b-button @click="showCriteriaForm = true; criteriaForm = {}" variant="info" size="sm" class="my-2 float-right">Add Criteria</b-button>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-card
                v-for="item in criteria"
                no-body
                class="mt-2"
            >
                <b-card-body>
                    <a @click.prevent="showCriteriaForm = true; criteriaForm = item">
                        <h5>{{ item.name }}</h5>
                    </a>
                    <b-row>
                        <b-col>
                            <div>Max points: {{item.max_points}}</div>
                            <div>Percentage: {{item.percentage}}%</div>
                            <div class="mt-2">
                                <b-button @click="showCriteriaForm = true; criteriaForm = item" size="sm" variant="info">Edit</b-button>
                                <b-button @click="deleteCriterion(item.id)" class="ml-2" size="sm" variant="danger">Delete</b-button>
                            </div>
                        </b-col>
                    </b-row>

                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
    </div>
</template>

<script>
    export default {
        name: 'criteria',
        data: function () {
            return {
                api: RestApiHandler.setService('/api/events/'+this.$store.getters.event.id+'/criteria'),
                showCriteriaForm: false,
                criteriaForm: {},
                criteria: []
            }
        },
        created() {
            this.getCritera();
        },
        methods: {

            getCritera(){
                this.api.index().then(response => {
                    console.log(response)
                    this.criteria = response.data
                });
            },

            saveCriterion(){
                this.api.save(this.criteriaForm).then(response => {
                    this.getCritera()
                    this.criteriaForm = {};
                    this.showCriteriaForm = false
                });
            },

            deleteCriterion(id) {
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this record",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.api.delete(id).then(response => {
                            swal("Criterion has been deleted!", {
                                icon: "success",
                            });
                            this.$router.push('set-criteria')
                            this.getCritera();
                        });
                    } 
                });
            }
        }
    }
</script>

<style scoped>

</style>

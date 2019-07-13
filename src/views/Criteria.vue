<template>
    <div>
    <b-row>
        <b-col>
            <b-modal :visible="showCriteriaForm" @hide="showCriteriaForm = false" hide-footer hide-header-close>
                <b-form @submit.prevent="saveCriteria">
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
            <b-button @click="showCriteriaForm = true; criteriaForm = {}" variant="info" size="sm" class="my-2 float-right">Add Criteria</b-button>
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
                    <a @click.prevent="chooseEvent(item)">
                        <h5>{{ item.name }}</h5>
                    </a>
                    <b-row>
                        <b-col>
                            <div>Max points: {{item.max_points}}</div>
                            <div>Percentage: {{item.percentage}}%</div>
                            <div class="mt-2">
                                <b-button @click="showCriteriaForm = true; criteriaForm=item" size="sm" variant="info">Edit</b-button>
                                <b-button @click="" class="ml-2" size="sm" variant="danger">Delete</b-button>
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
                fields :[
                    'name',
                    { key: 'action', label: '' },
                ],

                showCriteriaForm: false,
                criteriaForm: {},
                criteria: [
                    {id: 1, name: 'Relevance', percentage: 30, max_points: 10},
                    {id: 1, name: 'Effectiveness', percentage: 40, max_points: 15},
                    {id: 1, name: 'Efficiency', percentage: 20, max_points: 15},
                    {id: 1, name: 'Impact', percentage: 10, max_points: 20},
                ]
            }
        },
        methods: {
            saveCriteria(){
                this.showCriteriaForm = false
            }
        }
    }
</script>

<style scoped>

</style>

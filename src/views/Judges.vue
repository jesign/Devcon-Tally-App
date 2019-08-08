<template>
    <div>
    <b-row>
        <b-col>
            <b-modal title="Add Judge" :visible="showJudgeForm" @hide="showJudgeForm = false" hide-footer hide-header-close>
                <b-form @submit.prevent="saveJudge">
                    <b-form-group id="name" label="Name" label-for="input-2">
                        <b-form-input required v-model="judgeForm.name" class="mt-2"></b-form-input>
                    </b-form-group>
                    <b-form-group id="email" label="Email:" label-for="input-2">
                        <b-form-input required v-model="judgeForm.email" class="mt-2"></b-form-input>
                    </b-form-group>
                    <b-form-group id="password" label="Password" label-for="input-2">
                        <b-form-input type="password" required v-model="judgeForm.password" class="mt-2"></b-form-input>
                    </b-form-group>
                    
                    <b-button v-if="showDeleteBtn" @click="deleteJudge(judgeForm.id)" class="ml-2 mt-2" size="sm" variant="danger">Delete</b-button>

                    <b-button type="submit" class="float-right mt-2" variant="info">Save</b-button>
                    <b-button @click="showJudgeForm = false" class="float-right m-2" variant="light">Cancel</b-button>
                </b-form>
            </b-modal>
            <b-row>
                <b-col>
                    <b-button @click="setForm({}, true);" variant="info" size="sm" class="my-2 float-right"><font-awesome-icon icon="plus-circle"></font-awesome-icon> Add Judge</b-button>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-card
                v-for="item in judges"
                no-body
                class="mt-2"
            >
                <b-card-body>
                    <a @click.prevent="setForm(item, false)">
                        <h5>{{ item.name }}</h5>
                    </a>
                    <b-row>
                        <b-col>
                            <div class="mt-2">
                                <b-button @click="setForm(item, false)" size="sm" variant="info">Edit</b-button>
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
        name: 'judges',
        data: function () {
            return {
                showDeleteBtn: false,
                api: RestApiHandler.setService('/api/judges'),
                showJudgeForm: false,
                judgeForm: {},
                judges: [],
            }
        },
        created() {
            this.getJudges();
        },
        methods: {
            setForm(judge, isCreate) {
                this.showJudgeForm = true;

                if (!isCreate) {
                    this.judgeForm = judge;
                    this.showDeleteBtn = true;
                } else {
                    this.showDeleteBtn = false;
                }
            },
            getJudges(){
                this.api.index().then(response => {
                    console.log(response)
                    this.judges = response.data
                });
            },

            saveJudge(){
                this.api.save(this.judgeForm).then(response => {
                    this.getJudges()
                    this.judgeForm = {};
                    this.showJudgeForm = false
                });

                this.judgeForm = {};
                this.showJudgeForm = false
            },

            deleteJudge(id) {
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
                            this.judgeForm = {};
                            this.showJudgeForm = false
                            this.getJudges();
                        });

                    } 
                });
            }
        }
    }
</script>

<style scoped>

</style>

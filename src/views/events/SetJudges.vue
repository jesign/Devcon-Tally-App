<template>
	<b-row>
		<b-col>
			<b-row>
                <b-col>
                    <b-button @click="$router.push('event')" variant="outline-secondary" size="sm" class="my-2 float-left">< Back to Event</b-button>
		  			<!--<b-button @click="showJudgeForm = true; judgeForm = {}" variant="info" size="sm" class="mt-2 float-right"><font-awesome-icon icon="plus-circle"></font-awesome-icon> Add New Judge</b-button>-->
                </b-col>
            </b-row>
			<b-row>
				<b-col>
					<b-form @submit.prevent="onSubmit" class="mt-2 mb-5">
						<b-form-group id="input-group-3" label="Judges:" label-for="input-3">
							<multiselect v-model="judgesSelected" :options="judges" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="id" :preselect-first="true" @remove="deleteEventJudge">
							    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
							    </template>
					  		</multiselect>
					  	</b-form-group>
				  		<b-button type="submit" variant="success" size="xs" class="float-right">Save Judges</b-button>
				  	</b-form>
				  </b-col>
			  </b-row>
			<b-row>
				<b-col>
					<b-table striped hover :items="eventJudges" :fields="fields" class="mt-3"></b-table>
				</b-col>
			</b-row>
			
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

                    <b-button type="submit" class="float-right mt-2" variant="success">Save</b-button>
                    <b-button @click="showJudgeForm = false; judgeForm = {}" class="float-right m-2" variant="light">Cancel</b-button>
                </b-form>
            </b-modal>
		</b-col>
	</b-row>
	
</template>
<script>
	export default {
		data() {
			return {
				api: {
					judges: RestApiHandler.setService('/api/judges'),
					eventJudges: RestApiHandler.setService('/api/events/' + this.$store.getters.event.id + '/judges'),
					assignEventJudges: RestApiHandler.setService('/api/events/' + this.$store.getters.event.id + '/assign-judges'),
					deleteEventJudges: RestApiHandler.setService('/api/events/' + this.$store.getters.event.id + '/remove-judge'),
				},
				judges: [],
				judgesSelected: [],
				judgeForm: {},
				eventJudges: [],
				showJudgeForm: false,
				fields: ['name']
			}
		},
		methods: {
			getJudges(){
                this.api.judges.index().then(response => {
                    this.judges = response.data
                });
            },
            getEventJudges() {
				this.api.eventJudges.index().then(response => {
					this.eventJudges = response.data
					this.judgesSelected = response.data
				});
            },
            onSubmit() {
            	let judgeIds = [];

            	_.each(this.judgesSelected, (judge) => {
            		judgeIds.push(judge.id);
            	});

            	this.api.assignEventJudges.save({ judge_ids: judgeIds }).then(response => {
                   	swal("Judges successfully added")
                   	this.getEventJudges();
                });
            },
            deleteEventJudge(judge) {
            	this.api.deleteEventJudges.save({ id: judge.id }).then(response => {
           			console.log("successfully removed");

                	this.getEventJudges()
                });
            },
            saveJudge(){
                this.api.judges.save(this.judgeForm).then(response => {
                    this.getJudges()
                    this.judgeForm = {};
                    this.showJudgeForm = false
                });
            },
		},
		created() {
			this.getJudges();
			this.getEventJudges();
		}
	}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
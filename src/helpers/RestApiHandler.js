import RestApiService from '../services/RestApiService.js';

class RestApiHandler {
	constructor() {
	}

	setService(prefix) {
		return new RestApiService(prefix);
	}
}

export default RestApiHandler;
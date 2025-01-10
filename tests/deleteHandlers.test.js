// eslint-disable-next-line no-undef
const config = require('../config');


//prepare  POST Body
const requestBody ={
	"cardId":7,
	"name":"myKit"
}

test('Response status code should be 200', async () => {
	let actualStatusCode;
	let actualResponseBody;
	let actualKitId;

	// Step 1: Save id of the kit from POST response
    try {
		const postResponse = await fetch(`${config.API_URL}/api/v1/kits/`, {
			// Set Headers
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(requestBody)
		});
		// Use the json method on the response object to extract the data from the response body and wait for it to be parsed
		actualResponseBody = await postResponse.json();
		// Save id of the kit
		actualKitId = actualResponseBody.id;

	} catch (error) {
		console.error("Error during POST request:",error);
	}
	
	// Step 2: Use the saved ID in the DELETE request
    try {
		const deleteResponse = await fetch(`${config.API_URL}/api/v1/kits/${actualKitId}`, {
			// Set Headers
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// Extract response code status
		actualStatusCode = deleteResponse.status;		
	} catch (error) {
		console.error("Error during DELETE request:",error);
	}

	// Check response status
	expect(actualStatusCode).toBe(200);	
});

test('Check that the response body contains the expected data', async () => {
	let actualResponseBody;
	let actualDeleteResponseBody;
	let actualKitId;

	// Step 1: Save id of the kit from POST response
    try {
		const postResponse = await fetch(`${config.API_URL}/api/v1/kits/`, {
			// Set Headers
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(requestBody)
		});
		// Use the json method on the response object to extract the data from the response body and wait for it to be parsed
		actualResponseBody = await postResponse.json();
		// Save id of the kit
		actualKitId = actualResponseBody.id;

	} catch (error) {
		console.error("Error during POST request:",error);
	}
	
	// Step 2: Use the saved ID in the DELETE request
    try {
		const deleteResponse = await fetch(`${config.API_URL}/api/v1/kits/${actualKitId}`, {
			// Set Headers
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// Use the json method on the response object to extract the data from the response body and wait for it to be parsed
		actualDeleteResponseBody = await deleteResponse.json();		
	} catch (error) {
		console.error("Error during DELETE request:",error);
	}

	// Check that the response body contains the expected data
	expect(actualDeleteResponseBody).toBeDefined();
	expect(actualDeleteResponseBody).toHaveProperty("ok", true);
	
});
	

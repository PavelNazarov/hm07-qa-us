// eslint-disable-next-line no-undef
const config = require('../config');

test('Response status code should be 200', async () => {
	let actualStatusCode;
	try {		
		// Use the fetch method to send a GET request to the specified URL and wait for the response
		const response = await fetch(`${config.API_URL}/api/v1/kits/6`);
		// Extract response code status
		actualStatusCode = response.status;
		
	} catch (error) {
		// If an error occurs, log it to the console
		console.error(error);
	}
	// Check code status
	expect(actualStatusCode).toBe(200);
});

test('Response status code should be 404 for non-existing id 10', async () => {
	let actualStatusCode;
	try {		
		const response = await fetch(`${config.API_URL}/api/v1/kits/10`);
		actualStatusCode = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatusCode).toBe(404);
});

test('Response status code should be 404 for Empty value', async () => {
	let actualStatusCode;
	let actualResponse;
	try {		
		const response = await fetch(`${config.API_URL}/api/v1/kits/`);
		actualStatusCode = response.status;
	    actualResponse = await response.json();
	} catch (error) {
		console.error(error);
	}
	expect(actualStatusCode).toBe(400);
	// Check response message
	expect(actualResponse.message).toBe("Not all required parameters have been passed");
});

test('Response status code should be 400 for id with special characters %2', async () => {
	let actualStatusCode;
	try {		
		const response = await fetch(`${config.API_URL}/api/v1/kits/%2`);
		actualStatusCode = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatusCode).toBe(400);
});


test('Check that the response body contains the expected data', async () => {
	let actualResponseBody;
	try {		
		// Use the fetch method to send a GET request to the specified URL and wait for the response
		const response = await fetch(`${config.API_URL}/api/v1/kits/6`);
		// -- Use the json method on the response object to extract the data from the response body and wait for it to be parsed
		actualResponseBody = await response.json();
				
	} catch (error) {
		// If an error occurs, log it to the console
		console.error(error);
	}
	// Check that the response body contains the expected data
	expect(actualResponseBody).toBeDefined();
	expect(actualResponseBody.id).toBe(6);	
	expect(actualResponseBody.name).toBe("Strudel");		
	expect(actualResponseBody.productsList[0].id).toBe(89);
	expect(actualResponseBody.productsList[0].name).toBe("Brown Sugar");
	expect(actualResponseBody.productsList[0].price).toBe(2);
	expect(actualResponseBody.productsList[0].weight).toBe(750);
	expect(actualResponseBody.productsList[0].units).toBe('g');
	expect(actualResponseBody.productsList[0].quantity).toBe(1);
	expect(actualResponseBody.productsList.length).toBe(10);
	expect(actualResponseBody.productsCount).toBe(10);
});

// eslint-disable-next-line no-undef
const config = require('../config');

// Prepare POST body
const requestBody = {
	"productsList": [
		{
			"id": 1,
			"quantity": 3
		},
		{
			"id": 3,
			"quantity": 3
		}

	]
}

// Prepare PUT body
const requestPutBody = {
	"productsList": [		
		{
			"id": 3,
			"quantity": 1
		}

	]
}



test('Response status code should be 200', async () => {
	let actualResponseBody;
	let actualIdShopingCart;
	let actualStatusCode;
	
	// Step 1: Save id of the shopping cart from POST response
	try {
		// Use the fetch method to send a POST request to the specified URL and wait for the response
		const postResponse = await fetch(`${config.API_URL}/api/v1/orders`, {
			// Set headers
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(requestBody)			
		});
		// Use the json method on the response object to extract the data from the response body and wait for it to be parsed
		actualResponseBody = await postResponse.json();
		// Save the ID of the shopping cart
	    actualIdShopingCart = actualResponseBody.id;
	} catch (error) {
		// If an error occurs, log it to the console
		console.error('Error during the POST request:',error);
	}

	// Step 2: Use the saved ID in the PUT request
	try{
		// Perform the PUT request
		const putResponse = await fetch(`${config.API_URL}/api/v1/orders/${actualIdShopingCart}`, {
			// Set headers
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json'
			},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(requestPutBody)	
		});
		// Extract response code status
		actualStatusCode = putResponse.status;			
	} catch (error) {
		// If an error occurs, log it to the console
		console.error('Error during the PUT request:',error);
	}

	// Check response status
	expect(actualStatusCode).toBe(200);

});		


test('Check that the response body contains the expected data', async () => {
	let actualResponseBody;
	let actualPutResponseBody;
	let actualIdShopingCart;
	// Step 1: Save id of the shopping cart from POST response
	try {
		// Use the fetch method to send a POST request to the specified URL and wait for the response
		const postResponse = await fetch(`${config.API_URL}/api/v1/orders`, {
			// Set headers
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(requestBody)			
		});
		// Use the json method on the response object to extract the data from the response body and wait for it to be parsed
		actualResponseBody = await postResponse.json();
		// Save the ID of the shopping cart
	    actualIdShopingCart = actualResponseBody.id;
	} catch (error) {
		// If an error occurs, log it to the console
		console.error('Error during the POST request:',error);
	}

	// Step 2: Use the saved ID in the PUT request
	try{
		// Perform the PUT request
		const putResponse = await fetch(`${config.API_URL}/api/v1/orders/${actualIdShopingCart}`, {
			// Set headers
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json'
			},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(requestPutBody)	
		});
		// Use the json method on the response object to extract the data from the response body and wait for it to be parsed
		actualPutResponseBody = await putResponse.json();	
	} catch (error) {
		// If an error occurs, log it to the console
		console.error('Error during the PUT request:',error);
	}
	// Check that the response body contains the expected data
	expect(actualPutResponseBody.deliveryPrice).toBe(0);
	expect(actualPutResponseBody.deliveryPriceOur).toBe(10);
	expect(actualPutResponseBody.deliveryTime).toBe("20~25");
	expect(actualPutResponseBody.wareHouse).toBe("Fresh Food");
	expect(actualPutResponseBody.courierService).toBe("Order and Go");
	expect(actualPutResponseBody.productsList).toBeDefined();
	expect(actualPutResponseBody.productsList.length).toBe(2);
	expect(actualPutResponseBody.productsList[0].id).toBe(1);	
	expect(actualPutResponseBody.productsList[0].quantity).toBe(3);
	expect(actualPutResponseBody.productsList[1].id).toBe(3);	
	expect(actualPutResponseBody.productsList[1].quantity).toBe(4);
	expect(actualPutResponseBody.productsCost).toBe(14);
	expect(actualPutResponseBody.finalCost).toBe(14);
});

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

test('Response status code should be 201', async () => {
	let actualStatusCode;
    try {
		// Use the fetch method to send a POST request to the specified URL and wait for the response
		const response = await fetch(`${config.API_URL}/api/v1/orders`, {
			// Set headers
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(requestBody)
		});
		actualStatusCode = response.status; 
	} catch (error) {
		// If an error occurs, log it to the console
		console.error(error);
	}
			
	// Check code status
	expect(actualStatusCode).toBe(201);
});

test('Check that the response body contains the expected data', async () => {
	let actualResponseBody;
    try {
		// Use the fetch method to send a POST request to the specified URL and wait for the response
		const response = await fetch(`${config.API_URL}/api/v1/orders`, {
			// Set headers
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(requestBody)			
		});
		// Use the json method on the response object to extract the data from the response body and wait for it to be parsed
		actualResponseBody = await response.json();
	} catch (error) {
		// If an error occurs, log it to the console
		console.error(error);
	}
			
	// Check that the response body contains the expected data
	expect(actualResponseBody).toBeDefined();
	expect(actualResponseBody.productsList.length).toBe(2);
	expect(actualResponseBody.productsList[0].id).toBe(1);
	expect(actualResponseBody.productsList[0].quantity).toBe(3);
	expect(actualResponseBody.productsList[1].id).toBe(3);
	expect(actualResponseBody.productsList[1].quantity).toBe(3);
	expect(actualResponseBody.status).toBe(0);
	expect(actualResponseBody.deliveryPriceOur).toBe(10);
	expect(actualResponseBody.deliveryTime).toBe("20~25");
	expect(actualResponseBody.courierService).toBe("Order and Go");
	expect(actualResponseBody.deliveryPrice).toBe(0);
	expect(actualResponseBody.wareHouse).toBe("Fresh Food");
	expect(actualResponseBody.userId).toBeNull();
	expect(actualResponseBody.id).toBeDefined();
	expect(actualResponseBody.productsCost).toBe(12);
	expect(actualResponseBody.finalCost).toBe(12);
});


// Prepare POST body for conflict request
const conflictRequestBody = {
	"productsList": [
    {
      "id": 1,
      "quantity": 4
    },
    {
      "id": 3,
      "quantity": 3
    }

  ]
}

test('Response status code should be 409 for empty value', async () => {
	let actualStatusCode;
	let actualResponseBody;
    try {
		// Use the fetch method to send a POST request to the specified URL and wait for the response
		const response = await fetch(`${config.API_URL}/api/v1/orders`, {
			// Set headers
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			// Set request body and convert the data object into a JSON string
			body: JSON.stringify(conflictRequestBody)
		});
		actualStatusCode = response.status; 
	    actualResponseBody = await response.json();
	} catch (error) {
		// If an error occurs, log it to the console
		console.error(error);
	}			
	// Check code status
	expect(actualStatusCode).toBe(409);
	// Check response message
	expect(actualResponseBody.message).toBe("There is no warehouse to process your order");
});

'use strict';

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

/**
 * Wrapper function to get labels from image
 *
 * @async
 * @param {string} imageUrl - A string representing the URL to an image
 * @returns {object} - Returns a response body with statusCode and message (if successful, labels will be in message)
 */
exports.getImageLabels = async imageUrl => {
	let response = {
		statusCode: 0,
		message: ''
	};

	// Make sure we have the image URL
	if (imageUrl) {
		let labels = [];
		console.log(`Analyzing image at path: ${imageUrl}`);

		// Attempt to label image
		try {
			labels = await getLabelsFromImage(imageUrl);

			response = {
				statusCode: 200,
				message: labels
			};
		} catch (err) {
			console.error(`Failed to analyze image.`, err);
			throw err;
		}
	} else {
		// Request is not providing required data
		response = {
			statusCode: 400,
			message: 'Must provide "imageUrl" parameter!'
		};
	}

	return response;
};

/**
 * Get labels/tags from image using Google Cloud Vision API
 *
 * @async
 * @function
 * @param {string} imageUrl - A string representing the URL to an image
 * @returns {Array} - Returns an array of strings, of the image tags
 */
async function getLabelsFromImage(imageUrl) {
	const [RESULT] = await client.labelDetection(imageUrl);
	const _LABELS = RESULT.labelAnnotations;
	const LABELS = [];

	console.log('Labels:');
	_LABELS.forEach(label => {
		console.log(label.description);
		LABELS.push(label.description);
	});

	return LABELS;
}

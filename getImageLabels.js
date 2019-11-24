'use strict';

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

/**
 * Wrapper function to get labels from image
 *
 * @async
 * @param {string} imageUrl - A string representing the URL to an image
 * @returns {Array} - Returns an array of strings, of the image tags
 */
exports.getImageLabels = async imageUrl => {
	let response = null;

	// Make sure we have the image URL
	if (imageUrl) {
		let labels = [];
		console.log(`Analyzing image at path: ${imageUrl}`);

		// Attempt to label image
		try {
			labels = await getLabelsFromImage(imageUrl);
			response = labels;
		} catch (err) {
			console.error(`Failed to analyze image.`, err);
			throw err;
		}
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

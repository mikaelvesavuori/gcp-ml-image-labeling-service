'use strict';

const { getImageLabels } = require('./getImageLabels');

/**
 * Wrapper/export function for getting the labels
 *
 * @async
 * @param {Request} req - The request
 * @param {Response} res - The response
 * @returns {string} - The stringified output from the image labeling function
 */
exports.getLabels = async (req, res) => {
	// Make sure to parse stringified content, else leave it be
	const BODY = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
	console.log('BODY', BODY);
	const IMAGE_URL = BODY.imageUrl;
	console.log('IMAGE_URL', IMAGE_URL);

	if (IMAGE_URL) {
		const response = await getImageLabels(IMAGE_URL);
		if (response === null) {
			res.status(400).send(null);
		} else res.status(200).send(JSON.stringify(response));
	} else res.status(400).send(null);
};

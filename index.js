'use strict';

const { getImageLabels } = require('./getImageLabels');

exports.getLabels = async (req, res) => {
	// Make sure to parse stringified content, else leave it be
	const BODY = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
	const IMAGE_URL = BODY.imageUrl;
	console.log('IMAGE_URL', IMAGE_URL);

	if (IMAGE_URL) {
		const response = await getImageLabels(IMAGE_URL);
		res.status(response.statusCode).send(JSON.stringify(response.message));
	} else res.status(400).send(JSON.stringify("Missing 'imageUrl' in body!"));
};

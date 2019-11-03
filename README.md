# ML image labeling service, using Google Cloud Platform

This repo contains the source code for a machine learning-powered image labeling service, running as a serverless backend function.

It was made as part of a backend for the serverless tech demo application [ArtCollector](https://github.com/mikaelvesavuori/artcollector-frontend-gcp) but works just fine without any specific ties to that project.

This will be of great usage if you want to quickly set up an image tagging service or you could extend it to be used for checking if any posted images contain graphic/adult content.

## Prerequisites

- You will need a Google Cloud Platform account; if you don't have one, [set one up for free and get credit to use](https://cloud.google.com/free/)
- I am assuming that you will use [Serverless Framework](https://serverless.com) to deploy it (however you can certainly do that manually), which necessitates that you install it
- Configure `serverless.yml` with your project ID and a path to your keyfile/credentials

## Instructions

### Deployment

Just run `sls deploy` and it should deploy just fine, given that you configured the above steps and have a GCP account.

### Using the labeling service

Do a POST request to your URL, which will look something similar to `https://europe-west1-cloud-developer-basics.cloudfunctions.net/getLabels`.

Send a payload with the body containing an `imageUrl` key with the value being the URL for an image, so it looks like this:

```
{
	"imageUrl": "https://uploads1.wikiart.org/images/giorgio-de-chirico/mystery-and-melancholy-of-a-street-1914.jpg"
}
```

Your response should come back similar to the below:

```
[
  "Architecture",
  "Illustration",
  "Visual arts",
  "Building",
  "Arch",
  "Art",
  "Arcade",
  "Facade",
  "Column",
  "Painting"
]
```

## Tech used in this repo

- [Cloud Functions](https://cloud.google.com/functions/) is an event-driven, serverless _function-as-a-service_ offering that enables us to run backends without any server management
- [Cloud Vision API](https://cloud.google.com/vision/) uses machine learning to infer labels from images

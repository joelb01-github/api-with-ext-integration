# Nutual project

This repo includes an API which has two objectives:
- 1 endpoint to get the square meter price of a property based on several input via the integration of an addiation automated valuation model (AVM) service
- 1 endpoint to fetch aggregated data from our DB depending on several parameters

This repo contains the following elements:
- a database folder using postgreSQL (served with Sequelize ORM in the web server)
- a node.js/express based web server that will serve the above 2 endpoints
- a docker folder to provide a dockerised image of the database and application
- a test folder containing a few unit and integration tests to demonstrate what could be the testing strategy
- a postman folder containing the API endpoints in the Postman collection v2.1 format (json)

This folder does not include: 
- Cloud infrastructure - but some information has been shared in the below section Cloud Infrastructure
- CI/CD - but some information has been shared in the below section CI / CD

## Quick start

In order to set up the architecture locally, follow the below instructions:

```bash
cd docker/local/
docker-compose up --build
```

Note: you can avoid the `--build` option after the first time.

Note2: an admin user will automatically be created with the following information:

```json
{
  "id": "john2@test.com",
  "name": "john wane",
  "password": "123456OwW!"
}
```

## Tests

Check `/test/README.md`.

In order to make them work, you should set up the system as explain in `## Quick start`.

## API endpoints

Check Postman Collection for the list of endpoints.

## Cloud Infrastructure

There were no requirements to provide a cloud infrastructure for this project, however here are a few information on what could be part of it:
- VPC - virtual private cloud with its own public and private subnets that will be used by the different cloud components
- ECR - registry used to receive the docker image for our server application
- ECS Fargate - docker application orchestration service that will deploy and maintain our docker applications
- ELB - a load balancer sitting in front of our ECS services
- RDS - managed database hosting service for our postgreSQL database
- CodePipeline - CI/CD tool (see below)
- CodeBuild - used by CodePipeline to build our docker images (see below)
- IAM - service that will define the different roles to control access to the various services

## CI / CD

There were no requirements to provide CI/CD for this project, but this could tipically be done with a combination of a few AWS services such as:
- AWS CloudPipeline - this services allows to define deployment pipelines including different steps such as code sourcing (for ex Github), image building (via AWS CodeBuild), and deployement (ECS Fargate) which could be a simple in-place deployement or blue-green one.
- AWS CodeBuild - this is one of the steps used by CloudPipeline that will dockerize the data from the source, create a docker image, and push it to the indicated ECR registry where it will be used for the deployment step.
- AWS ECS - this service is in charge of orchestrating the deployment and maintenance of our dockerized applications and will, through CodePipeline, fetch the latest image and deploy it.
- AWS CloudFormation - as mentionned in the previous paragraph, all services would be defined inside of CloudFormation YAML documents following Infrastructure As Code principles.

## Monitoring

No monitoring provided. But this could be done with third-party services like datadog, or AWS own tool CloudWatch or something more in-house like Graphana.

---

## Notes

- I understand from the requirements that the API should be able to fetch information from a data lake and aggregate it in a certain format (here price per sqm) upon some given paramenters (city, area, ...). My knowledge on data modelling and management is limited and I have not used any of the tools that could perfom such operations. I am familiar with traditional SQL type databases and I decided to use this in order to advance on the problem. As such, I have simplified the data stored in the DB to the minimum e.g. a single table. It would be more efficient and scalable to use appropriate data stores such as AWS Redshift to avoid constant expensive db scanning on the SQL table.
- I also have another limitation regarding OOP. In my past experiences, I always used a functional programming style in node using libraries such as Highland and Rambda libraries so my experience is limited on this topic.
- I created a very simple user service that uses JWT for authentication. A 3rd party service like Firebase Auth or AWS Cognito should rather be used to guarantee security and implementation easiness (social login for example).
- We are only keeping the latest valuation in the DB, but an improvement could be to store all the ones made in order to extract more information (evolution with time for ex); this would probably go anyway with a better way to store that information with a cron job / scrapper to update the DB regularly

- hypothesis
  - we are only dealing with spain allowing to validate the zipcode against spanish zipcode
  - we assume this API is only consumed
  - we assume in this case data can be aggregated by either city or postcode, but this could be extended to latitude/longitude or address in the same way

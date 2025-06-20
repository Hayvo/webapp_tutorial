# Full Tutorial: Client-Server Web App Development

This repository provides a comprehensive guide to building a client-server web application from scratch. Learn backend and frontend development, RESTful API design, database integration, authentication, testing, and deployment.

---

## Table of Contents

- [Full Tutorial: Client-Server Web App Development](#full-tutorial-client-server-web-app-development)
  - [Table of Contents](#table-of-contents)
  - [**Prerequisites**](#prerequisites)
  - [**Deploying the React Web App and Backend using a CI/CD pipeline**](#deploying-the-react-web-app-and-backend-using-a-cicd-pipeline)
    - [**Google Cloud Platform (GCP)**](#google-cloud-platform-gcp)
    - [**Cloud Build**](#cloud-build)
    - [**Deployment**](#deployment)

---
## **Prerequisites**

To follow this tutorial, you should have:

- Basic knowledge of Python, JavaScript, and web development.
- [Python 3.x](https://www.python.org/downloads/) installed on your machine.
- The Python [`pip`](https://pip.pypa.io/en/stable/installation/) package manager installed
- Node Package Manager [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- SQLite (or the database of your choice, if customizing).
- A code editor (e.g., VS Code).

---


## **Deploying the React Web App and Backend using a CI/CD pipeline**

For detailed tutorials please see : 
- [Backend Deployment Tutorial](./backend/README.md)
- [Frontend Deployment Tutorial](./frontend/README.md)

This section requires you to have access to a GCP Project with Cloud Run API, Artifact Registry API and Cloud Run API enabled. 

This tutorial is mostly based on the article written by Paulo Schmidt on **medium.com**. You can find the link of the article in the following documentation.

Provided documentation :
  - [GCP setup for a simple web application](https://medium.com/@paulo.a.s/gcp-setup-for-a-simple-web-application-13cd463ba664)
  - [A Complete Guide for GCP: Cloud Build](https://medium.com/@williamwarley/guide-for-gcp-cloud-build-c2ea264a7f97)
  - [Set-up CI/CD using Github Actions and Google Cloud Build](https://medium.com/@_davidanderson/set-up-ci-cd-using-github-actions-and-google-cloud-build-c0c4252e0cbe)
  - [Cloud Build for CICD](https://cgrant.medium.com/cloud-build-for-cicd-c0e05e1a157e)
  - [Deploy to Cloud Run with CI/CD | GCP](https://medium.com/google-cloud/deploy-to-cloud-run-with-ci-cd-gcp-5cde4692217d)
  - [Containerize and Deploy Your First App on Cloud Run](https://medium.com/@yunandarpalilati/containerize-and-deploy-your-first-app-on-cloud-run-ab38c809b291)


First of all, CI/CD stands for Continuous Integration / Continuous Delivery. It means that the deployment of the application is automated and there is no need of manually re-build and re-deploy the entire app at each change. We can automate this process based on a trigger (each commit to the main branch of a Github repository for example).  

Here is the global architecture of the CI/CD pipeline.

![Architecture](https://miro.medium.com/v2/resize:fit:720/format:webp/1*6Sc7o27vzuVm24qiJgdPDg.png)

### **Google Cloud Platform (GCP)**

The entire infrastructure for building and deploying the code, as well as hosting the application, is managed by GCP. Each logical group of resources is contained within a project, so that's the first thing we have to setup in GCP.

1. Access https://console.cloud.google.com/
2. In the main dashboard, click "Create Project" button
3. Give it a name
4. Click "Create" button

Now we can start preparing the resources that we would like GCP to manage for us.

### **Cloud Build**

Cloud Build is the main resource when it comes to continuous integration and delivery (CI/CD) of the application's code, and in my case it does that through the use of triggers, which I'll show you how to setup next. Once a trigger is activated, it goes through the following process:

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*WRb8jPUsPl-NDi2zgYSnBQ.png)

1. Cloud Build pulls the source code from the repository in GitHub. This is possible because at this point I have already connected Cloud Build to GitHub (steps described [here](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers#connect_repo)).

2. A Docker image is created out of the code, based on the Dockerfile stored in the GitHub repository. What happens is that behind the scenes GCP issues a "docker build" command, as we would do if building an image manually..

3. Cloud Build issues the push command from Docker to store the built image to GCP's Artifact Registry.

4. A container is created from the image and the container is deployed to a Cloud Run instance. Cloud Run uses Knative, an open-source serverless platform built on top of Kubernetes, to deploy and manage containers, but that's totally transparent to the user/developer.

The process above is highly customizable, allowing extra steps like running test scripts on the container, deploying to multiple environments (ex.: test, stage, prod), etc. But we'll keep it simple for now. The way I defined the process above was via a cloudbuild.yaml file, stored together with my source code in the GitHub repository, and to be referenced during the setup of the Cloud Build Trigger, which we'll see next. This is how the file looks like:

```yaml
 steps:
 # Build the container image
 - name: 'gcr.io/cloud-builders/docker'
   args: [
    'build', 
    '-t', 'us-east1-docker.pkg.dev/$PROJECT_ID/my-app-repo/my-app-backend-image:$COMMIT_SHA', 
    '-f', './my-app-backend/Dockerfile.prod',
    './my-app-backend']

 # Push the container image to Artifact Registry
 - name: 'gcr.io/cloud-builders/docker'
   args: ['push', 'us-east1-docker.pkg.dev/$PROJECT_ID/my-app-repo/my-app-backend-image:$COMMIT_SHA']
 
 # Deploy container to Cloud Run
 - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
   entrypoint: gcloud
   args: [
   'run', 'deploy', 'my-app-backend',
   '--image', 'us-east1-docker.pkg.dev/$PROJECT_ID/my-app-repo/my-app-backend-image:$COMMIT_SHA',
   '--region', 'us-east1',
   '--allow-unauthenticated']
```

Google's documentation to setup a Cloud Build Trigger can be found [here](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers). One of the options that you have to choose is the configuration type. Select "Cloud Build configuration file (yaml or json)" and reference the location of the file within the GitHub repository:
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Va-J6Kg4p01vNFTfST_LDw.png)

### **Deployment**

For automated deployment and backend/frontend communication I invite you to follow the rest of Paulo Schmidt's tutorial [here](https://medium.com/@paulo.a.s/gcp-setup-for-a-simple-web-application-13cd463ba664).


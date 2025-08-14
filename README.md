# NEET College Predictor (API-based Flask APP)

## 🔗 Live Demo (Static Only)
[Visit Live Site (Hosted on AWS Amplify)](https://main.d2wwlot1nd8xar.amplifyapp.com/)  
> This version uses client-side filtering and loads data from `cutoffs.json`.

This project helps NEET aspirants find eligible colleges and courses based on their rank and category using a Flask backend API and a simple HTML+JS frontend.

This README walks through everything needed to build, run, test, Dockerize, and deploy this Flask app, with two deployment paths:

AWS Amplify serverless containers (Fargate) — recommended if insisting on Amplify.

Elastic Beanstalk (simple alternative for Flask containers).

It also includes local setup and how to run the project.


## Features
- Input: NEET Rank + Category
- Output: List of eligible Colleges + Branches

## Project Overview

Python Flask app using Jinja templates and static assets.

**Data files:** data.db (SQLite for dev), users.csv, cutoffs.json.

Containerized with Docker (Gunicorn for production).

CI/CD with GitHub Actions.


## Repo structure:

```
NEET PRED/
├── app.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
├── README.md
├── LICENSE
├── cutoffs.json
├── data.db  # it wil be creates after application is running
├── users.csv  # created after running sqlite3 commands to create and download this file (Check for commands at end of deployment).
├── public  
      ├── static/
            └── cutoffs.json
            └── image.png 
            └── script.js
            └── style.css
    └── index.html
├── templates/
│   └── index.html
├── tests/ (Optional)
│   └── test_import.py    # If you want to run sample tests to your project for CI pass.
└── .github/
    └── workflows/
        └── main.yml

```
| Folder       | Purpose                                | Served by Amplify?   
| ------------ | -------------------------------------- | ------------------   
| `templates/` | Used by Flask for rendering at runtime | ❌ No               |
| `public/`    | Holds static HTML/CSS files            | ✅ Yes              |



**Prerequisites**

- Python 3.11+ installed for local dev.

- Docker installed on local and running in background(for container builds).

- GitHub repository created and code pushed.
  - If not pushed to GitHub or Fork or Clone this Repo:
    ```bash
    git init
    ```
    <img width="1915" height="429" alt="pwd git init" src="https://github.com/user-attachments/assets/5133051b-824e-4ecb-b661-c9038429bb74" />

    ```bash
    git add .
    ```
    <img width="1906" height="1012" alt="stage files" src="https://github.com/user-attachments/assets/af151ae7-0c03-4150-ad45-d231172d552e" />

    ```bash
    git commit -m "Intial commit"
    ```
    <img width="1919" height="547" alt="commit files" src="https://github.com/user-attachments/assets/8c4af6f0-89bb-4dae-81c6-22e861bbc779" />

    - Add your remote GitHub repository
    - Go to your GitHub account, create a new empty repository (no README or .gitignore).
    - Copy the URL — it will look something like:
    - HTTPS: https://github.com/yourusername/your-repo-name.git
    - Then add it to your local Git config:
    ```bash
    git remote add origin https://github.com/yourusername/your-repo-name.git
    git remote -v
    ```
    <img width="1905" height="275" alt="add remote" src="https://github.com/user-attachments/assets/890c26aa-16ad-4276-a69a-9699d10ca385" />

    ```bash
    git push -u origin main
    ```
        
    <img width="1918" height="362" alt="push to github" src="https://github.com/user-attachments/assets/21bee8dd-4e9f-411c-af0f-4f60984ea8e6" />


- Create/Login to Docker Hub account + access token.

- Login/Signup for AWS account.


## **Step 1: Create `requirements.txt`**

- Add this file at the repo root copy from repository

## **Step2: `Dockerfile` under root directory(Gunicorn on port 8000):**

- Create Dockerfile at the repo root copy from repository

## **Step 3: Create  `.dockerignore` under root directory**

- Optional .dockerignore (recommended):
- Copy from GitHub copy from repository and paste in your `.dockerignore` 

## **Step 4: Local verification (optional but recommended)**

- Build:
  ```docker
  docker build -t YOUR_DOCKERHUB/neetpred:latest .
  ```

  In my case it is (docker build -t praneethkumarellandula28/neetpred:latest .)

  <img width="1919" height="1015" alt="Docker local build" src="https://github.com/user-attachments/assets/c3c34116-157e-4af0-9eda-5981658c3975" />

- Run:
  ```docker
  docker run -p 8000:8000 YOUR_DOCKERHUB/neetpred:latest
  ```

  In my case it is (docker run -p 8000:8000 praneethkumarellandula28/neetpred:latest)
  
  <img width="1919" height="108" alt="docker run" src="https://github.com/user-attachments/assets/b84ca305-0d92-4130-8a0f-a7faab540ee0" />

  
Open  [http://localhost:8000](http://localhost:8000)


If your app uses a different port, align EXPOSE and the -p mapping.

## **Step 5: Create GitHub Secretes**

- Add in GitHub repo → Settings → Secrets and variables → Actions:
- Click on new repositry secret
  
<img width="1903" height="955" alt="Docker gen token" src="https://github.com/user-attachments/assets/1a5d4cf5-fd4f-413b-847a-917003758ef0" />

- DOCKERHUB_USERNAME # Copy and paste in secret

- DOCKERHUB_TOKEN # Go to Docker Desktop and in profile check for personal access tokens and Generate one token and paste it in this it can found in [Docker Hub](https://app.docker.com/accounts/YOUR_USERNAME/settings/personal-access-tokens)

- AMPLIFY_WEBHOOK_URL # you can create and paste url from from Step 7 after creating AWS Amplify app and Incoming Hooks in Amplify.

  <img width="1893" height="965" alt="Create token" src="https://github.com/user-attachments/assets/138e11b8-3dad-4235-a7cf-1e41136c9273" />

If your app needs sensitive env vars, add them here too and inject in workflow or Amplify.

## **Step 6: Add GitHub Actions workflow**

- Create .github/workflows/main.yml:
- Take it from Repo

# **Notes:**

The Docker image will be YOUR_DOCKERHUB/neetpred; change neetpred if you prefer a different repo name.

If your Flask app object name/path differs, update the Docker CMD in the Dockerfile

## **Step 7: AWS Amplify setup**

Goal: Connect Amplify Hosting to your GitHub repo/branch and create a webhook URL to trigger builds after CI succeeds.

  7A) Login to AWS Console (Don't have Account Create here: [AWS Console](https://aws.amazon.com/console/)
  
  - Create Amplify Hosting app and connect GitHub
  - Sign in to AWS Console.
  - Go to AWS Amplify.
  - Deploy App / Select Template Click on Deploy App.  
  - Click “Host web app.”
  - Choose “GitHub” as provider, authorize GitHub if prompted.
    
    <img width="1919" height="1019" alt="amplify authorize" src="https://github.com/user-attachments/assets/9d838e52-c1bd-4a98-b4a1-fad94464fdd5" />
  
  - Select your repository and the main/master branch check in your repository.
  - Build settings:

    - Amplify auto-detects common frontends; for Flask you’re effectively serving backend pages, but Amplify Hosting expects a front-end build from Git.
    - Complete the connection; let Amplify create the app.
    - Wait until app is deployed.
      
  7B) Create an incoming webhook (to trigger builds only when CI passes)
  
  - In Amplify Hosting console, open your app.
  - In left menu, go to Hosting.
  - Build settings Scroll down to Incoming Webhook.
  - Find “Incoming webhooks”
  - Create webhook.
  - Name it (e.g., ci-passed-main), choose branch main.
  - Copy the Webhook URL.
  - In GitHub repo → Settings → Secrets and variables → Actions → New repository secret: Check Step 5
    - Name: AMPLIFY_WEBHOOK_URL
    - Value: paste the webhook URL.
  7C) Verify Amplify build file
  - If Amplify expects a build and your repo lacks a frontend build process, you can:
  - Provide an amplify.yml in the repo root to define no-op or custom commands.
  - Or let Amplify keep default build but it may fail if there’s nothing to build.

    ```amplify.yml
    version: 1
    frontend:
      phases:
        preBuild:
          commands: []
        build:
          commands: []
      artifacts:
        baseDirectory: public
        files:
          - '**/*'
      cache:
        paths: []
    ```

## **Step 8: First pipeline run**

- Push a commit to main. 
<img width="1919" height="970" alt="build init" src="https://github.com/user-attachments/assets/9cb35be7-6c39-44c0-9a63-de5dc94bace0" />

- GitHub Actions:
  - Installs Python deps, runs tests.
  - Builds and pushes Docker image to Docker Hub.
  - Calls the Amplify webhook.

In Amplify console, watch the build/deploy logs for the connected branch.

  <img width="1887" height="697" alt="Build success" src="https://github.com/user-attachments/assets/727f76a0-adf3-4d47-bb6e-66982f0cba8e" />

## **Step 9:  Handling your data files**

- data.db: Inside the container this will reset on rebuild; for persistent data, use a managed DB (RDS/Aurora/SQLite not recommended for production persistence in containers) or mount a volume (not applicable to Amplify Hosting).
- users.csv and cutoffs.json: Fine to include as read-only assets. Access via relative paths in code.

Use below steps to download `users.csv`
If you want to download data

  - Install SQL3 lite in local machine or include it in `requirements,txt`
  
  - PS D:\NEET Pred> sqlite3 data.db
  - For using SQLite in local to check record it will navigate to mysql
  - MySQL> type below commands one by one to get user records to save records in excel check user details in data.db for virtual storage
  
  ```mysql
  .headers on
  .mode csv
  .output users.csv
  SELECT * FROM users;
  .output stdout
  .quit
  ```


## **Step 10: Visit your deployed app amplify link**
- It will be found in App Overview
- Click on link "Kaboom" Website is Deployed Successfully.

  <img width="1919" height="1079" alt="success deploy" src="https://github.com/user-attachments/assets/fce747fd-3e86-4476-9b61-5e8ac83ab7b0" />

Friends if you are Beginner to DevOps or Cloud Cannot complete this project for become expert check out [Pranith Kumar GitHub](https://github.com/Pranith1Kumar)

Beginners after completing this project

<img width="1213" height="685" alt="ori na koduka" src="https://github.com/user-attachments/assets/8727e91e-1634-4047-bdac-3ca5d572818c" />


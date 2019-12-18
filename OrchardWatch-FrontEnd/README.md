# Front-End Installation

Guide to the installation of the front-end of this project, mainly done in a terminal. 

## Install Node.js

**Follow the guide on their site to set it up for your system**

[Node.js Downloads](https://nodejs.org/en/download/)

You can check if you have them installed if you navigate to your terminal on your system and run these commands:

```bash
node -v
```

```bash
npm -v
```

## Navigate to the folder of your choice for this project.

```bash
cd /path/to/directory/
```

## Clone the Git Project

```bash
git clone https://github.com/david-fisher/320-F19-Track-I.git
```

## Navigate into the project directories

```bash
cd 320-F19-Track-I/OrchardWatch-FrontEnd/orchardwatch/
```

## Install node

**This step may take a while**

```bash
npm install
```

## Start the local server

```bash
npm start
```

If you want to stop the server, in the terminal that is running it press CTRL+C

### Future testing and Maintenance/Deployment

### 'npm update'

Updates any package changes

### 'npm run build'

Builds the app in the 'build' folder to be deployed to production.<br />
Copy and send all files and folders inside the 'build' folder to your working cloud distribution (CloudFront in our case).
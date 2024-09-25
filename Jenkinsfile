pipeline {
    agent any
    tools {
        // This should match the NodeJS installation name in Jenkins (configured via Global Tool Configuration)
        nodejs "Nodejs 20.x"
    }
    environment {
        NODE_ENV = 'production'
    }
    stages {

         stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Check Node Version') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }


        stage('Clone repository') {
            steps {
                // Cloning the repository from GitHub
                git url: 'https://github.com/XyvinTech/cbs-counseling-frontend.git', branch: 'main'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install the dependencies using npm
                bat 'npm install --include=dev'
            }
        }

        stage('List Installed Node Modules') {
            steps {
                bat 'dir node_modules'
            }
        }

        
        stage('Build Project') {
            steps {
                // Build the project
                bat 'npm run build'
            }
        }

        // Optional: Deployment stage to copy build files to another directory
        // stage('Deploy to backend') {
        //     steps {
        //         // Copy the build files to the appropriate directory
        //         bat 'xcopy /E /I /Y dist\\* C:\\data\\jenkins_home\\workspace\\cbs-counseling-backend\\dist'
        //     }
        // }
    }
}

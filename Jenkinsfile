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
       
        
        stage('Clone repository') {
            steps {
                // Cloning the repository from GitHub
                git url: 'https://github.com/XyvinTech/cbs-counseling-frontend.git', branch: 'main'
            }
        }
        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }


        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                // Copy the build files to the appropriate directory
                // For example, if your server exposes static files via IIS or Apache:
                bat 'xcopy /E /I /Y build\\* C:\\data\\jenkins_home\\workspace\\cbs-backend-v1@2\\build'
            }
        }
    }
 
}

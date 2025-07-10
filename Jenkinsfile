pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build') {
      steps {
        // send slack
        slackSend color: "#439FE0", message: "Build Started"

        // build image
        sh 'docker build -f project/Dockerfile -t thehaohcm/stockvn-frontend-ui:latest .'

        // push image
        sh 'docker image push thehaohcm/stockvn-frontend-ui:latest'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker image pull thehaohcm/stockvn-frontend-ui:latest'

        // stop an existing container
        sh '''
          if [ "$( docker container inspect -f '{{.State.Running}}' stockvn-frontend-ui )" = "true" ]; then
            docker stop stockvn-frontend-ui
          fi
          '''

        // start a container
        sh 'docker run -d --rm --name stockvn-frontend-ui -p 8081:80 thehaohcm/stockvn-frontend-ui:latest'
      }
    }
  }

  post{
    success{
      slackSend color: "#43E053", message: "Build deployed successfully"
    }
    failure{
      slackSend failOnError: true, color: "#EB1005", message: "Build failed"
    }
  }
}
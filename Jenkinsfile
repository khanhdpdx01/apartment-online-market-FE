pipeline {
    agent any
    environment {
        DOCKER_IMAGE="khanhdpdx01/apartment-online-market-web"
    }
    stages {
        stage('Test') {
            steps {
                sh 'echo Test passed!'
            }
        }
        stage('Docker build and push') {
            environment {
                DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
            }
            steps {
                script {
                    echo DOCKER_TAG
                }
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} . "
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                sh "docker image ls | grep ${DOCKER_IMAGE}"
                withDockerRegistry(credentialsId: 'docker-secret', url: 'https://index.docker.io/v1/') {
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
                sh "docker image rm ${DOCKER_IMAGE}:${DOCKER_TAG}"
                sh "docker image rm ${DOCKER_IMAGE}:latest"
                sh 'docker rmi $(docker images -f "dangling=true" -q)'
            }
        }
        stage('SSH server and deploy') {
            steps{
                sh 'echo deploy'
                sh "ssh -i ~/.ssh/id_rsa_ggcloud khanhdpdx@34.142.222.244 './deploy.sh'"
            }
        }
    }
    post {
    success {
      echo "SUCCESSFUL"
    }
    failure {
      echo "FAILED"
    }
  }
}
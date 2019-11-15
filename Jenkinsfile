node {
  try {
    //bitbucketStatusNotify(buildState: 'INPROGRESS')
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      echo "Build: ${env.BUILD_NUMBER}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build') {
      sh 'apt-get install node'
      sh 'npm -v'
      // sh 'apt install node'
      // sh 'node -v'
      // sh 'npm prune'
      // sh 'npm install'
      // sh 'npm run-script build-prod'
    }
    // stage('Deploy'){
    //   sh 'echo $USER'
    //   sh "docker image build -t ${env.IMAGE_TAG} ."
    //   sh "docker container stop ${env.CONTAINER_NAME}"
    //   sh "docker container rm ${env.CONTAINER_NAME}"
    //   sh "docker container run --publish ${env.HOST_PORT}:${env.CONTAINER_PORT} --detach --name ${env.CONTAINER_NAME} ${env.IMAGE_TAG}"
    //   //bitbucketStatusNotify(buildState: 'SUCCESSFUL')
    // }
  }
  catch (err) {
    //bitbucketStatusNotify(buildState: 'FAILED')
    throw err
  }
}
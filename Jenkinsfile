node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build') {
      env.NODEJS_HOME = "${tool 'node'}"
      // on linux / mac
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
      sh 'npm --version'
    }
    stage('Deploy'){
      if (env.BRANCH_NAME == 'master') {
        sh 'echo $USER'
        sh 'docker image build -t product-catalogue:1.0 .'
        sh 'docker container run --publish 4000:4600 --detach --name procat product-catalogue:1.0'
      }
    }
  }
  catch (err) {
    throw err
  }
}
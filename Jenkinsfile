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
    stage('Deploy'){
      if (env.BRANCH_NAME == 'master') {
        sh 'echo $USER'
        sh 'docker image build -t product-catalogue:1.0 .'
        sh 'docker container run --publish 4001:4600 --detach --name procat-v2 product-catalogue:1.0'
      }
    }
  }
  catch (err) {
    throw err
  }
}
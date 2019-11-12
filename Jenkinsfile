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
      if(env.BRANCH_NAME == 'master'){
          sshagent (credentials: ['87984278-ad96-426d-b9df-500bb56eb656']) {
            sh 'docker image build -t product-catalogue:1.0'
            sh 'docker container run --publish 8000:4600 --detach --name bb product-catalogue:1.0'
          }
      }
    }
  }
  catch (err) {
    throw err
  }
}
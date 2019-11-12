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
        sh 'docker build -t product-catalogue --no-cache .'
        sh 'docker tag product-catalogue localhost:5000/product-catalogue'
        sh 'docker push localhost:5000/product-catalogue'
        sh 'docker rmi -f product-catalogue localhost:5000/product-catalogue'
      }
    }
  }
  catch (err) {
    throw err
  }
}
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
        sh 'sudo docker build -t product-catalogue --no-cache .'
        sh 'sudo docker tag product-catalogue localhost:5000/product-catalogue'
        sh 'sudo docker push localhost:5000/product-catalogue'
        sh 'sudo docker rmi -f react-app localhost:5000/product-catalogue'
      }
    }
  }
  catch (err) {
    throw err
  }
}
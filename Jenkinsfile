pipeline {
    agent any
    tools {
        jdk 'jdk-8'
        maven 'default-maven'
    }
    stages {
        stage('build') {
            steps {
                sh 'mvn clean install -Pbackend,frontend'
            }
        }

        stage('docker publish'){
            steps {
                sh '$(aws ecr get-login --no-include-email --region eu-central-1)'
                sh 'docker build -t 250682802074.dkr.ecr.eu-central-1.amazonaws.com/wbh-projekt-ecr:v_$BUILD_NUMBER .'
                sh 'docker push 250682802074.dkr.ecr.eu-central-1.amazonaws.com/wbh-projekt-ecr:v_$BUILD_NUMBER'
            }
        }

        stage('deploy on AWS'){
            steps {
                sh '''
                    #Constants
                    REGION=eu-central-1
                    REPOSITORY_NAME=wbh-projekt-ecr
                    CLUSTER=wbh-projekt
                    FAMILY=`sed -n 's/.*"family": "\\(.*\\)",/\\1/p' taskdef.json`
                    NAME=`sed -n 's/.*"name": "\\(.*\\)",/\\1/p' taskdef.json`
                    SERVICE_NAME=${NAME}-service
                    DESIRED_COUNT=1
                    #Store the repositoryUri as a variable
                    REPOSITORY_URI=`aws ecr describe-repositories --repository-names ${REPOSITORY_NAME} --region ${REGION} | jq .repositories[].repositoryUri | tr -d '"'`
                    #Replace the build number and respository URI placeholders with the constants above
                    sed -e "s;%BUILD_NUMBER%;${BUILD_NUMBER};g" -e "s;%REPOSITORY_URI%;${REPOSITORY_URI};g" taskdef.json > ${NAME}-v_${BUILD_NUMBER}.json
                    #Register the task definition in the repository
                    REVISION=`aws ecs register-task-definition --family ${FAMILY} --cli-input-json file://${WORKSPACE}/${NAME}-v_${BUILD_NUMBER}.json --region ${REGION} | jq .taskDefinition.revision`
                    SERVICES=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq .failures[]`
                    
                    
                    #Create or update service
                    if [ "$SERVICES" == "" ]; then
                      echo "entered existing service"
                      OLD_TASK_DEF=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq '.services[].deployments[] | select(.desiredCount > 0) | .taskDefinition' | tr -d '"'`
                      
                      echo "TASK-DEF to stop: $OLD_TASK_DEF"
                      aws ecs update-service --cluster ${CLUSTER} --region ${REGION} --service ${SERVICE_NAME} --task-definition ${OLD_TASK_DEF} --desired-count 0 --deployment-configuration minimumHealthyPercent=0
                      aws ecs update-service --cluster ${CLUSTER} --region ${REGION} --service ${SERVICE_NAME} --task-definition ${FAMILY}:${REVISION} --force-new-deployment --desired-count $DESIRED_COUNT --deployment-configuration minimumHealthyPercent=0
                    else
                      echo "entered new service"
                      aws ecs create-service --service-name ${SERVICE_NAME} --desired-count $DESIRED_COUNT --task-definition ${FAMILY} --cluster ${CLUSTER} --region ${REGION} --deployment-configuration minimumHealthyPercent=0
                    fi
                    
                    
                    echo "Wait until deployment is finished ..."
                    RUNNING_COUNT=0
                    until [ $RUNNING_COUNT -eq $DESIRED_COUNT ]; do
                        RUNNING_COUNT=`aws ecs describe-services --services ${SERVICE_NAME} --cluster ${CLUSTER} --region ${REGION} | jq '.services[].deployments[] | select(.desiredCount > 0) | .runningCount'`
                        echo "Currently running: $RUNNING_COUNT / $DESIRED_COUNT tasks"
                        sleep 5 
                    done
                '''
            }
        }

    }
}
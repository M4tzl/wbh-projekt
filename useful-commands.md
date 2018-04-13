# Aktueller Deploymentstand

aws ecs describe-services --services wbh-projekt-service --cluster wbh-projekt --region eu-central-1 | jq .services[].deployments[]
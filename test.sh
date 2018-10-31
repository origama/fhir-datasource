#!/usr/bin/env bash

#======================================================
# ENV VARIABLE DEFINITION
#------------------------------------------------------
# Change these variables to wanted test values
#======================================================

# grafana
dsName=FHIR-Test
dsType="fhir-datasource"
dsUrl="http://hapi.fhir.org/baseDstu3"
dsAccess="proxy"
# The bearer token needs to be generated on grafana once and it will be persisted
# you can obtain one here: http://127.0.0.1:3000/org/apikeys
grafanaToken="eyJrIjoiWG9tRWJlSDVnbm02ajk4TDdhQkhWT0x2WEJSQWpvbFkiLCJuIjoibGViYnkiLCJpZCI6MX0="
grafanaUrl=http://127.0.0.1:3000

# docker
dockerComposePath="./dockerTest/docker-compose.yml"

#======================================================
# Do not change below
#======================================================

main() {
    echo "#####################################"
    echo "FHIR-DASHBOARD TEST"
    echo -e "#####################################\n\n"

    echo "Running from: $(pwd)"

    echo "stopping grafana if it is running..."
    docker-compose -f ${dockerComposePath} stop grafana && echo "done!"
    
    echo "Building the datasource..."
    npm run-script build && echo "done!" || echo "Impossible to build"
    
    echo "running grafana container now..."
    docker-compose -f ${dockerComposePath} up -d && echo "done!" || echo "Impossible to run the container"

    local status=""
    while [ "$status" != "200" ];do
        status="$(  curl -sI -H "Authorization: Bearer ${grafanaToken}" http://127.0.0.1:3000/api/datasources/ \
                    | head -1 | awk '{print $2}')"
        echo "waiting for grafana to come online... [${status}]"
        sleep 2
    done  
    echo "Grafana is up now."
    echo "Deleting the datasource... "
    deleteDS "${dsName}"
    echo "creating new datasource..."
    createDS "${dsName}" "${dsType}" "${dsUrl}" "${dsAccess}" && \
    echo "Datasource created." || echo "cannot create datasource."

    echo "you can now test the datasource in a brand new dashboard"
    echo "http://127.0.0.1:3000/dashboard/new?panelId=2&fullscreen&edit&orgId=1"
}

# Deletes the datasource
# params: 
#   $1 : datasource name
deleteDS() {
    curl -s -H "Authorization: Bearer ${grafanaToken}" -X DELETE ${grafanaUrl}/api/datasources/name/${1} >/dev/null
}

# Creates a new dashboard
# params:
#   $1 : DS name
#   $2 : DS type
#   $3 : DS url
#   $4 : DS Access type
createDS() {
    curl -s "${grafanaUrl}/api/datasources" \
        -H 'Content-Type: application/json;charset=utf-8' \
        -H "Authorization: Bearer ${grafanaToken}" \
        -H 'Accept: application/json' \
        -H 'Content-Type: application/json;charset=utf-8' \
        --data "{\"name\":\"${1}\",\"type\":\"${2}\",\"url\":\"${3}\",\"access\":\"${4}\"}" > /dev/null
}

main $@
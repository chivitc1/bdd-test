#!/bin/bash
clear
export $(grep -v '^#(.+)$' envs/.env | xargs)

SCRIPT_PATH=$0
function set_current_working_dir() {
  cd "$(dirname "$(realpath $SCRIPT_PATH)")/../$1";
  pwd
}
set_current_working_dir "bdd-backend"

# e2e test optional params
optFeatureFile=$1
optLineNumParam=$2
cucumberSpec="$optFeatureFile:$optLineNumParam"

function check_optional_params() {
  # No params => default test all features
  if [ -z $optFeatureFile ]; then
    cucumberSpec="features"
  else
    # No Second param => test all scenarios in the feature file
    if [ -z $optLineNumParam ]; then
      cucumberSpec=$optFeatureFile    
    fi
  fi
}

check_optional_params
echo "Spec: $cucumberSpec"
npx cucumber-js -f json:test/reports/cucumber_report.json --require-module @babel/register --require steps/ $cucumberSpec
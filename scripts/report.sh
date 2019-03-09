#!/bin/bash
clear
#export $(grep -v '^#(.+)$' envs/.env | xargs)

SCRIPT_PATH=$0
function set_current_working_dir() {
  cd "$(dirname "$(realpath $SCRIPT_PATH)")/../$1";
  pwd
}
set_current_working_dir "bdd"

npx babel-node report.js
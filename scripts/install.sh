#!/bin/bash
clear

cd driver/ && yarn install && cd .. \
&& cd bdd-backend/ && yarn install && cd .. \
&& mkdir -p bdd-backend/test/reports

# cd bdd-frontend/ && yarn install && cd ..

# mkdir -p bdd-frontend/test/reports

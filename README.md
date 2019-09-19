BDD tests
--------------------
## Setup

For MAC OS install realpath: brew install coreutils
For Linux realpath should already be available

git clone https://github.com/chivitc1/bdd-test.git

git checkout bdd/main

cd driver/ && yarn install && cd ..

cd bdd-backend/ && yarn install && cd ..

mkdir -p bdd-backend/test/reports

cp envs/.env.example envs/.env

`Change .env file as your environment`

## Start Driver api server
$ yarn start

## Test e2e
- Make sure your driver up
$ yarn start

- Make sure the testing api up
Turn on your external testing api (like java, python,... source)
eg: cd my_java_project/ && docker-compose up -d

- Test all e2e tests

$ yarn test:backend

- Test a feature file

$ yarn run test:backend spec/cucumber/features/helloworld/test.feature

- Test one scenario by specify feature file and line number

$ yarn run test:backend spec/cucumber/features/helloworld/test.feature 2

BDD tests
--------------------
## Setup

For MAC OS install realpath: brew install coreutils
For Linux realpath should already be available

git clone  https://114.185.31.150.static.iijgio.jp/gitlab/nal/kwmc_frontend.git

git checkout autotest/main

cd driver/ && yarn install && cd ..

cd bdd-backend/ && yarn install && cd ..

mkdir -p bdd-backend/test/reports

cd bdd-frontend/ && yarn install && cd ..

mkdir -p bdd-frontend/test/reports

cp envs/.env.example envs/.env

`Change .env file as your environment`

## Test e2e
- Make sure your driver up
$ yarn start

- Make sure the testing api up
Turn on your external testing api (like java, python,... source)
eg: cd my_java_project/ && docker-compose up -d

- Test all e2e tests

$ yarn test

- Test a feature file

$ yarn run test features/helloworld/test.feature

- Test one scenario by specify feature file and line number

$ yarn run test features/helloworld/test.feature 2

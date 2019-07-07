BDD tests
--------------------
## Setup

For MAC OS install realpath: brew install coreutils
For Linux realpath should already be available

- Chekout source code:

git clone  git@github.com:chivitc1/bdd-test.git

git checkout autotest/main

- Install node js dependencies:

yarn install

- Set environment variables:

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

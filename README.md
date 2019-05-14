BDD tests
--------------------

## On Mac OS please install realpath

$ brew install coreutils

## Setup

git clone https://github.com/chivitc1/bdd-test.git

git checkout bdd/main

cd driver/ && yarn install && cd ..

cd bdd/ && yarn install && cd ..

cp envs/.env.examples envs/.env

`Change .env file as your environment`

## Start Driver
$ cd driver

$ yarn start

or 

$ yarn serve

## To debug with VSCode:
- active server.js
- Press F5

If there code changes -> restart the debug process to update code.

## Test e2e
- Make sure your driver up
$ yarn start

- Make sure the testing api up
Turn on your external testing api (like java, python,... source)
eg: cd my_java_project/ && docker-compose up -d

- Test all e2e tests

$ yarn test

- Test a feature file

$ yarn run test spec/cucumber/features/helloworld/test.feature

- Test one scenario by specify feature file and line number

$ yarn run test spec/cucumber/features/helloworld/test.feature 2

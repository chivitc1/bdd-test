- BDD test using cucumber to test any system: so it will not depend on the testing system.

- For convenience, we create driver module to interact with testing system: api, database, message buss middleware,... to simplify the bdd test module.

- Cucumber js using Gherkin to write Natural Language test scenarios, and test steps will be implemented using javascript. But for convenience, I add babel transpile lib so we can use ES6+ javascript code.

- Currently I am using babel modules:
"@babel/core": "7.5.0"

"@babel/preset-env": "7.5.0"

"@babel/register": "7.4.4"

And .babelrc config file:

{
    "presets": ["@babel/preset-env"]
}

- Beyond than those, I also use 

"core-js": "3.1.4"

"regenerator-runtime": "0.13.2"

So I can use async, await test function instead of ugly callback() in async test steps.

- Report:

"@babel/node": "^7.5.0" => need to run the command: npx babel-node report.js

"cucumber-html-reporter": "^5.0.0" => lib for report.js to generate test report from the test/report/xx.json data

reporter = require('cucumber-html-reporter');

var options = {
  theme: 'bootstrap',
  jsonDir: 'bdd-backend/test/reports',
  jsonFile: 'bdd-backend/test/reports/cucumber_report.json',
  output: 'bdd-backend/test/reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
      "App Version":"0.3.2",
      "Test Environment": "STAGING",
      "Browser": "Chrome 67.0.3396.79",
      "Platform": "ubuntu",
      "Parallel": "Scenarios",
      "Executed": "Remote"
  }
};

reporter.generate(options);


//more info on `metadata` is available in `options` section below.

//to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.
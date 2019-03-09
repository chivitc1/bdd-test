Feature: Authenticate
    Scenario: Get authen token for user
    When client create a GET request to /oauth2/token
    And send the request
    Then the api should respond with a 200 HTTP status code
    And payload contains a token

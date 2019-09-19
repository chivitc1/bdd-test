Feature: Authenticate API
    Scenario: Get a token via authen api /api/v1/auth/token
    Given Having an user with role MEMBER in a team
    When client post a request to api token authen /api/v1/auth/token with user credentials
    Then the API should respond with a 200 HTTP status code
    And payload contains an accessToken

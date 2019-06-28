Feature: Authenticate API
    Scenario: Login attaching a well-formed payload
    When client create a POST request to /api/v1/auth/token 
    And Attach a valid login payload
    And send the request
    Then the API should respond with a 200 HTTP status code
    And payload contains an accessToken

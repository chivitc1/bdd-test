Feature: Hello World
    Scenario: Get hello message
    When client create a GET request to /hello
    And send the request
    Then the Driver should respond with a 200 HTTP status code
    And payload should be a JSON object
    And contains message {"message":"Hello World"}
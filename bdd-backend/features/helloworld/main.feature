Feature: Hello World
    Scenario: Get hello message
        When client create a GET hello request to /driver/hello
        And send the request
        Then the respond code should be 200
        And The hello respond payload should contains expected message

    Scenario: Update hello message
        When client create a PATCH hello request to /driver/hello
        And send the request
        Then the respond code should be 200
        And The hello respond payload should contains expected message
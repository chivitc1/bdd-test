Feature: Send email
    Background:
        Given Have a replying email in CHECKED status
        And Retrieve accessToken for user member1

    Scenario: send-email module can deliver email message
        When Post a SEND email request operation to /api/v1/mails/{id}/mails
        Then the API should respond with a 200 HTTP status code
        When Check sent email in database
        Then The replying email message_id should have been set

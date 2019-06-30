Feature: Send email
    Background:
        Given Have a replying email in an email thread

    Scenario: send-email module can deliver email message
        When Channel mail.postprocessed has a sending email request
        And When I get the replying email
        Then The replying email message_id should have been set

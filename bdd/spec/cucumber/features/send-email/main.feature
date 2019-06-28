Feature: Send email
    Scenario: send-email module can deliver email message
        Given Have a replying email in an email thread
        When Channel mail.postprocessed has a sending email request
        Then The email gets delivered

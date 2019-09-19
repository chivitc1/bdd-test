Feature: Fetch email and classify email
    Background:
        Given Having users, teams, folders, mail_servers, mailing_list, mail_accounts, email preprocess rules

    Scenario: Fetch customer email from mail-group and classify to uncategoried folder
        When Customer send an email to the mail_group support without matching any preprocess rule
        And Check email in database
        Then The email should have been fetched and classified into uncategoried folder

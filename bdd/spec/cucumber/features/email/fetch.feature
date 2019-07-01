Feature: Fetch email
    Background:
        Given Having Teams, folders, mail_servers, mail_accounts, mailing_list for kwmcjp1@gmail.com

    Scenario: Fetch email from mail-list
        When Sending an email to mailing_list kwmcjp1@gmail.com
        Then The email should be saved in database

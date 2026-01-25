# action-repo
Webhook test line
Testing pull request webhook
merge test

This repository is used to generate GitHub events such as:

Push

Pull Request

Merge

It does not contain any backend logic.
Its only purpose is to act as a source repository that triggers events which are then captured by the webhook service.

This separation is intentional to clearly demonstrate how GitHub webhooks work in a real-world scenario, where one repository generates events and another system listens to them.

Why this repository is needed

GitHub webhooks work only when actions happen inside a repository.
To test and demonstrate webhook functionality properly, we need a repository where:

Code changes can be pushed

Branches can be created

Pull requests can be opened and merged

This repository fulfills that role.

How this repository is used

The following actions are performed in this repository:

1. Push Event

Any commit pushed to any branch triggers a push event.

Example:

Editing README.md

Committing the change

Pushing to GitHub

2. Pull Request Event

Creating a pull request from one branch to another triggers pull_request events.

Example:

Create branch dev

Push changes to dev

Open pull request from dev to main

3. Merge Event

Merging a pull request creates:

A pull_request event with merged = true

A push event on the target branch

These events are captured by the webhook backend.

Webhook Configuration

A GitHub webhook is configured in this repository with the following settings:

Payload URL: Public ngrok URL pointing to /webhook

Content type: application/json

Events selected:

Push

Pull requests

Whenever an event occurs, GitHub sends a POST request to the webhook backend.

Relationship with webhook-repo

This repository only produces events.
All event processing, storage, and display are handled by webhook-repo.

This clean separation makes the system easier to understand and closer to real-world architecture.

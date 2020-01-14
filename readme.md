# Spudbot (BETA)

The ultimate spud master.

To add to slack:
1. Go to https://api.slack.com/apps and "Create New App"
2. Fill in some general info
3. Add a bot user
4. Activate Event Subscriptions and add <URL>/api/messages as Request URL
5. Subscribe to the following events: 
Event Name	Description
message.channels
A message was posted to a channel

message.groups
A message was posted to a private channel

message.im
A message was posted in a direct message channel

message.mpim
A message was posted in a multiparty direct message channel

reaction_added
A member has added an emoji reaction to an item

reaction_removed
A member removed an emoji reaction

6. Create a MongoDB instance: https://cloud.mongodb.com/
7. Update .env file
8. Upload this code to AWS Elastic Beanstalk
9. Go to your apps API endpoint to install: <URL>/install
10. Should work


This bot was created using [Botkit](https://botkit.ai/docs/v4)

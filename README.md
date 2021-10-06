# automate-team-responsibilities
Github action to determine responsibilities within a team automatically. Can be posted as an embed in Discord.

## Parameters
team: A JSON representation of a JavaScript array of team member names (minimum 2)  
responsibilities: A JSON representation of a JavaScript array of objects containing {name: string, number, number} objects.  
discord-webhook: A discord webhook represented as a URL.

## Outputs
responsibility-distribution: A stringified version of the responsibility and team member name pairs.

### Examples
team: '["Octo", "Cat"]'  
responsibilities: '[{"name": "cake", "number": 1}, {"name": "milk", "number": 1}]'
discord-webhook: https://discord.com/api/webhooks/99999999999999/aagaxz2cWHb-RfO0iO3fXJKrvMUaY11dsupZHr9_vYCJXs7n5GSpEn
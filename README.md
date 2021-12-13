DigitalOcean Passport Example
========================

An example app implementing DigitalOcean OAuth with Passport.js.

## Getting Started

To bring your own remix to life, you'll need to visit DigitalOcean's [app registration](https://cloud.digitalocean.com/settings/api/applications) page to create a new oauth app, and use `https://{your-remix}.glitch.me/login/digitalocean/return` as the Authorization callback URL.  Once you've done this, place the resulting ClientID and ClientSecret into the `.env` file. 

## View the Code

On the back-end,
- the app starts at `server.js`
- frameworks and packages are in `package.json`
- app secrets are safely stored in `.env`

On the front-end,
- edit `index.html` and `success.html`

## Credits

- Built with [passport-digitalocean](https://github.com/harbur/passport-digitalocean)
- Remixed from the [GitHub Passport Example](https://glitch.com/~github-oauth)

## Docs

- Find out more about the DigitalOcean OAuth API in the [DigitalOcean developer documentation](https://developers.digitalocean.com/documentation/oauth/).
- Learn more about OAuth on the [DigitalOcean community site](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2).
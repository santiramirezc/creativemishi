# Creative Mishi
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=chghealthcare_chg-node-template-tool&metric=alert_status&token=fe47929da889ba3cc810cc1680b6dc963ba00da9)](https://sonarcloud.io/dashboard?id=chghealthcare_chg-node-template-tool)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=chghealthcare_chg-node-template-tool&metric=coverage&token=fe47929da889ba3cc810cc1680b6dc963ba00da9)](https://sonarcloud.io/dashboard?id=chghealthcare_chg-node-template-tool)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=chghealthcare_chg-node-template-tool&metric=security_rating&token=fe47929da889ba3cc810cc1680b6dc963ba00da9)](https://sonarcloud.io/dashboard?id=chghealthcare_chg-node-template-tool)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=chghealthcare_chg-node-template-tool&metric=sqale_rating&token=fe47929da889ba3cc810cc1680b6dc963ba00da9)](https://sonarcloud.io/dashboard?id=chghealthcare_chg-node-template-tool)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=chghealthcare_chg-node-template-tool&metric=security_rating&token=fe47929da889ba3cc810cc1680b6dc963ba00da9)](https://sonarcloud.io/dashboard?id=chghealthcare_chg-node-template-tool)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chghealthcare_chg-node-template-tool&metric=vulnerabilities&token=fe47929da889ba3cc810cc1680b6dc963ba00da9)](https://sonarcloud.io/dashboard?id=chghealthcare_chg-node-template-tool)

As git and github is for developers a place to connect and collaborate

Creative Mishi is here for any creator that wants to connect and collaborate with other people

## Dependencies

- `node 14.x`
- `npm 6.14.x`

## Development

### Starting the Service

This project uses [`dotenv`](https://www.npmjs.com/package/dotenv) to import environment variables from a file. For running the service, make sure the `.env` file has been created. You can copy the `./example.env` to start.

Then you can run:

```sh

# Start service
npm start

# or in watch mode
npm run dev

```

### Unit Tests

```sh
npm run test

## run unit tests in watch mode
npm run test:watch
```

There is a coverage requirement of 90% (statements, branches, functions, and lines).

## Contributing

1. Create your feature branch (git checkout -b feature/fooBar)
2. Commit your changes (git commit -am 'Add some fooBar')
3. Push to the branch (git push origin feature/fooBar)
4. Quality gates are run in github workflow
5. Create a new Pull Request

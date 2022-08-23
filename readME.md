# Example of using Playwright with Browserstacks

- Uses a fixture to extend the base test class, which automatically launches browserstacks for each test
- Uses the page object model

## Tp Run:

- Setup a browserstack account
- Create a API integration
- Create a .env file at the root level
- Populate like:
```
BROWSERSTACK_USERNAME = 'some_username'
BROWSERSTACK_ACCESS_KEY = 'some_key'
```

## Debugging Commands

`npx playwright codegen https://www.ensono.com`
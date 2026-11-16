# Employee Management Playwright Automation

Playwright and TypeScript automation for an Employee Management workflow.

## Scenario Covered

- Log in to the application
- Navigate to Employees
- Add two employees
- Populate mandatory and optional fields
- Verify successful employee creation
- Search for and verify both employees and their job titles

## Framework

- Playwright with TypeScript
- Page Object Model
- `beforeEach` login setup
- Custom Playwright fixtures
- Unique runtime test data
- Environment-based configuration
- Playwright assertions and reporting
- GitHub Actions CI

## Setup

Install dependencies:

```bash
npm ci
npx playwright install
```

Create a `.env` file in the project root:

```text
BASE_URL=<application-url>
TEST_USER_EMAIL=<username>
TEST_USER_PASSWORD=<password>
```

The `.env` file is excluded from Git.

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run in Chromium:

```bash
npx playwright test --project=chromium
```

Run with the browser visible:

```bash
npx playwright test --headed
```

Run in debug mode:

```bash
npx playwright test --debug
```

View the HTML report:

```bash
npx playwright show-report
```

## CI/CD

GitHub Actions runs the Playwright tests on configured pushes and pull requests and uploads the Playwright HTML report as an artifact.

CI credentials and environment values are managed through GitHub repository secrets.

# Weather App Tests

This folder contains comprehensive tests for the Weather App project using Jest and React Testing Library.

## Test Structure

```
__tests__/
├── components/           # Component tests
│   ├── CityInput.test.tsx
│   ├── CityList.test.tsx
│   ├── Logo.test.tsx
│   └── Weather.test.tsx
└── lib/                  # Business logic tests
    ├── actions/
    │   └── weather.actions.test.ts
    ├── controllers/
    │   └── weather.controller.test.ts
    └── datasources/
        └── weather.datasource.test.ts
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

### Components (4 files, 38 tests)
- **Weather.test.tsx**: Tests for weather display component including error states, data rendering, and accessibility
- **CityInput.test.tsx**: Tests for city input form including user interactions and form submission
- **CityList.test.tsx**: Tests for city list component including active city highlighting and link generation
- **Logo.test.tsx**: Tests for logo SVG component

### Business Logic (3 files, 45 tests)
- **weather.actions.test.ts**: Integration tests for server actions including FormData and string input handling
- **weather.controller.test.ts**: Unit tests for weather controller error handling and data transformation
- **weather.datasource.test.ts**: Unit tests for API datasource including HTTP requests, error handling, and data mapping

## Key Testing Features

### Mocking
- **API calls**: Global fetch is mocked to avoid real HTTP requests
- **Environment variables**: Test API key is set in jest.setup.ts
- **Dependencies**: WeatherDatasource and WeatherController are mocked where appropriate

### Test Categories
1. **Rendering tests**: Verify correct DOM output
2. **User interaction tests**: Simulate user events (typing, clicking)
3. **Error handling tests**: Verify graceful error handling
4. **Integration tests**: Test complete flows end-to-end
5. **Accessibility tests**: Ensure proper ARIA labels and semantic HTML

### Best Practices
- Each test is isolated and independent
- Descriptive test names following "should" convention
- Proper cleanup with `beforeEach` hooks
- Clear arrange-act-assert pattern
- Mock external dependencies
- Test both success and error paths

## Technologies Used

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Additional DOM matchers
- **TypeScript**: Type-safe tests

## Writing New Tests

When adding new tests, follow these guidelines:

1. Place tests in the appropriate folder matching the source structure
2. Name test files with `.test.ts` or `.test.tsx` extension
3. Group related tests using `describe` blocks
4. Use descriptive test names that explain the expected behavior
5. Mock external dependencies to keep tests fast and reliable
6. Test both happy paths and error scenarios
7. Ensure accessibility in component tests

## CI/CD Integration

These tests are designed to run in continuous integration environments. The test suite:
- Runs in under 3 seconds
- Has no external dependencies (all mocked)
- Provides clear error messages for failures
- Generates coverage reports for quality tracking

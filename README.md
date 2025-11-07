This is an example project that demonstrate how to write automation test for socketio (websocket).
The project consists both the code for bringing up the socketio service, as well as for the tests for it using socketio-client with Playwright test runner.
# Run the socketio service.
```
npm run start 
```

# Run the test

```
npx playwright test tests/weather.spec.ts
```

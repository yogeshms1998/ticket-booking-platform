const test = require('node:test');
const assert = require('node:assert/strict');

const connectDB = require('../src/config/db');
const app = require('../src/app');

test('GET /api/events/events returns a response', async () => {
  await connectDB();

  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/events/events`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
  } finally {
    server.close();
  }
});

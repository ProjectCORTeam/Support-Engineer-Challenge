#!/bin/sh
set -e

echo "Setting up TaskMaster..."

# Run migrations
node scripts/migrate.js

# Run seeds
node scripts/seed.js

# Start the server
echo "Starting server..."
exec node src/server.js


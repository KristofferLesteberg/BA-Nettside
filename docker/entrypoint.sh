#!/bin/sh
set -e
# Fix ownership of the bind-mounted data directory, then drop to the app user
chown -R ba-user:ba-group /app/data
exec su-exec ba-user "$@"

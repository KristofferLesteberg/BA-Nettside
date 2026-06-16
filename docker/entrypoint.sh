#!/bin/sh
set -e
chown -R ba-user:ba-group /app/data
mkdir -p /app/images /app/.next/cache/images
chown -R ba-user:ba-group /app/images /app/.next/cache/images
exec su-exec ba-user "$@"

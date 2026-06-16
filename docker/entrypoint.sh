#!/bin/sh
set -e
chown -R ba-user:ba-group /app/data
mkdir -p /app/images
chown -R ba-user:ba-group /app/images
exec su-exec ba-user "$@"

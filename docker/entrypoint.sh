#!/bin/sh
set -e
chown -R ba-user:ba-group /app/data
mkdir -p /app/public/images/high-res /app/public/images/med-res /app/public/images/low-res
chown -R ba-user:ba-group /app/public/images
exec su-exec ba-user "$@"

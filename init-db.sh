#!/bin/bash
set -e

echo "Running database initialization script..."

psql -U "$POSTGRES_USER" <<EOF
CREATE DATABASE locations;
CREATE DATABASE logs;
EOF

echo "Databases created successfully!"
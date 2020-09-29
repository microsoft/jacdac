#!/bin/sh
set -x
set -e
rm -rf ../services/generated
tsc
node built/jdspectool ../services
cp ../services/generated/services.json ../dist/
cp ../services/generated/*.ts ../dist/

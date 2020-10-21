#!/bin/sh
set -x
set -e
rm -rf ../services/generated
tsc
node built/jdspectool ../services
node built/jdspectool -d ../devices
cp ../services/generated/services.json ../dist/
cp ../services/generated/*.ts ../dist/
cp ../services/generated/*.sts ../dist/


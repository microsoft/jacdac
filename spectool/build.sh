#!/bin/sh
set -x
set -e
rm -rf ../services/generated
tsc
node built/jdspectool ../services
node built/jdspectool -d ../modules
cp ../services/generated/services.json ../dist/
cp ../services/generated/c/*.h ../dist/c/
cp ../services/generated/*.ts ../dist/
cp ../services/generated/*.sts ../dist/


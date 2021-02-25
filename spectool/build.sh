#!/bin/sh
set -x
set -e
rm -rf ../services/generated
tsc
node built/jdspectool ../services
tsc ../services/generated/tests/*.ts
node built/jdspectool -d ../devices
rm -f ../dist/c/*.h
rm -f ../dist/json/*.json
cp ../services/generated/services*.json ../dist/
cp ../services/generated/c/*.h ../dist/c/
cp ../services/generated/*.ts ../dist/
cp ../services/generated/*.sts ../dist/
cp ../services/generated/json/*.json ../dist/json/

#!/bin/sh
set -x
set -e
rm -rf ../services/generated
rm -rf ../dist
mkdir ../dist
mkdir ../dist/c
mkdir ../dist/dtdl
tsc
node built/jdspectool ../services
node built/jdspectool -d ../devices
cp ../services/generated/services.json ../dist/
cp ../services/generated/c/*.h ../dist/c/
cp ../services/generated/*.ts ../dist/
cp ../services/generated/*.sts ../dist/


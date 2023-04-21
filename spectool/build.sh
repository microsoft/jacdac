#!/bin/sh
set -x
set -e
rm -rf ../services/generated
tsc
node built/jdspectool ../services
node built/jdspectool -d ../devices
prettier --write ../services/generated/*.ts
rm -f ../dist/c/*.c
rm -f ../dist/c/*.h
rm -f ../dist/json/*.json
rm -f ../dist/py/*.py
rm -f ../dist/c/*.h
cp ../services/generated/services*.json ../dist/
cp ../services/generated/*.ts ../dist/
cp ../services/generated/*.sts ../dist/
cp ../services/generated/c/*.h ../dist/c/
cp ../services/generated/c/*.c ../dist/c/
cp ../services/generated/json/*.json ../dist/json/

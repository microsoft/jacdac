all:
	rm -rf ../services/generated
	tsc
	node built/jdspectool ../services
	cp ../services/generated/spec.json ../dist/
	cp ../services/generated/*.ts ../dist/

install:
	npm install

start:
	npx babel-node 'src/gendiff.js' $(ATTR)

publish:
	npm publish --dry-run

lint:
	npx eslint ./
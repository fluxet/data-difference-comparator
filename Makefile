install:
	npm install

start:
	npx babel-node 'src/cli.js' $(ATTR)

publish:
	npm publish --dry-run

lint:
	npx eslint ./

test:
	npx jest
install:
	npm install

start:
	npx babel-node 'src/index.js' $(ATTR)

publish:
	npm publish --dry-run

lint:
	npx eslint ./

test:
	npx jest
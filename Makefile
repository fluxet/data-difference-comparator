install:
	npm install

start:
	npx babel-node 'src/api.js' $(ATTR)

publish:
	npm publish --dry-run

lint:
	npx eslint ./

test:
	npx jest
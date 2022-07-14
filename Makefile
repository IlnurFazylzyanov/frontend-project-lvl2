install:
	npm ci
gendiff:
	node bin/gendiff.js
publish:        
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test --watch
test-coverage:
	npm test --coverage --coverageProvider=v8
test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --bail --watch
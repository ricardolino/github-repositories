install:
	npm install
	bower install
	gulp

clean:
	rm -rf node_modules/ public/

clean-i: clean
	make install
#!/bash/sh

npm install && chmod +x .husky/pre-commit && git submodule update --init --recursive && cd submodules/condsmith && npm install 

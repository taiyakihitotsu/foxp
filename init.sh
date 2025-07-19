#!/bin/bash

npm install && git submodule add -f -b main git@github.com:taiyakihitotsu/condscript.git submodules/scripts && git submodule add -f -b master git@github.com:taiyakihitotsu/condsmith.git submodules/condsmith && git submodule sync --recursive && git submodule init && git submodule update --init --recursive && cd submodules/condsmith && npm install

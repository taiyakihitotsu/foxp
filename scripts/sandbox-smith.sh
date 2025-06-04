#!/bin/bash

if [ -e .ignore/.tmp ]; then
  rm -rf .ignore/.tmp
fi

mkdir -p .ignore/.tmp
cp -r src .ignore/.tmp && npm --prefix submodules/condsmith run format:smith ../../.ignore/.tmp


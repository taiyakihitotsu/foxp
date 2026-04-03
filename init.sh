#!/bin/bash
git submodule sync --recursive
git submodule update --init --recursive

pnpm install --frozen-lockfile

cd submodules/condsmith && pnpm install --no-frozen-lockfile
cd ../..

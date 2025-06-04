#!/bin/bash

echo -e "[condsmith🔨] Comparing with the original ..."

find src -type f | while read f; do
  f2=".ignore/.tmp/${f#src/}"
  if [ -f "$f2" ] && ! cmp -s "$f" "$f2"; then
    diff -uN "$f" "$f2"
  fi
done > .ignore/diff.patch


if [ -s .ignore/diff.patch ]; then
   git --no-pager diff  --no-index --color src .ignore/.tmp
   rm -rf .ignore/.tmp .ignore/diff.patch
   echo -e "\n\033[31m[condsmith🔨] Original src file is not formatted.\033[0m"
   exit 1
else
   rm -rf .ignore/.tmp .ignore/diff.patch
   echo -e "\033[32m[condsmith🔨] Original src file is formatted well.\033[0m"
   exit 0
fi

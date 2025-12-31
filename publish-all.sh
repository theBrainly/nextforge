#!/bin/sh
set -e


for pkg_version in v1 v2 v3; do
  pkg_name="nextjs-$pkg_version"
  echo "\n==> Building CLI for $pkg_name..."
  node scripts/build-cli.js "$pkg_version"

  echo "\n==> Publishing $pkg_name..."
  cd "dist/$pkg_name"
  # npm publish --access public
  echo "(Simulating publish for $pkg_name)"
  cd ../..
done

echo "\nAll packages processed."

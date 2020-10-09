#!/usr/bin/env sh

exit-with-error() {
  CODE=$?
  echo "ERROR: $@" > /dev/stderr
  exit $CODE
}

./node_modules/.bin/gulp prod build || exit-with-error "Gulp build failed"
tar -zcvf "../build/client.tar.gz" --transform 's,^public,client,' public || exit-with-error "Archive build failed"

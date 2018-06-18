#!/bin/bash

VERSION=$1

gulp prod build
tar -zcvf "/scp/install.synergycp.com/bm/${VERSION}/theme/default/client.tar.gz" --transform 's,^public,client,' public

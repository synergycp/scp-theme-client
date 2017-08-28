#!/bin/bash

gulp prod build
tar -zcvf "/scp/install.synergycp.com/bm/theme/default/client.tar.gz" --transform 's,^public,client,' public

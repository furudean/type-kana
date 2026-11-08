#!/usr/bin/env bash

set -e
cd "$(dirname "$0")"

npm run build

rsync -zhave ssh --progress build himawari.fun:/opt/node
ssh himawari.fun "
    cd /opt/node && \
    systemctl stop type-kana.service && \
    rm -rf type-kana && \
    mv build type-kana && \
    chown -R node:node type-kana && \
    systemctl start type-kana.service
"
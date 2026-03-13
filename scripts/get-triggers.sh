#!/usr/bin/env bash

set -e
source ~/.bin/dotfiles/.secrets.zconfig

curl "http://$NIGHTINGALE:8080/triggers"


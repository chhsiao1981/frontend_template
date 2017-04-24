#!/bin/bash


if [ "${BASH_ARGC}" != "1" ]
then
  echo "usage: scripts/dev_hcontainer.sh [module (a.b.c)]"
  exit 0
fi

module=${BASH_ARGV[0]}

echo "[INFO] to create hcontainer: ${module}"
pcreate -s hcontainer . ${module}

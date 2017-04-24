#!/bin/bash


if [ "${BASH_ARGC}" != "1" ]
then
  echo "usage: scripts/dev_container.sh [module (a.b.c)]"
  exit 0
fi

module=${BASH_ARGV[0]}

echo "[INFO] to create container: ${module}"
pcreate -s container . ${module}

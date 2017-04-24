#!/bin/bash


if [ "${BASH_ARGC}" != "1" ]
then
  echo "usage: scripts/dev_component.sh [module (a.b.c)]"
  exit 0
fi

module=${BASH_ARGV[0]}

echo "[INFO] to create component: ${module}"
pcreate -s component . ${module}

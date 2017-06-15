#!/bin/bash


if [ "${BASH_ARGC}" != "1" ]
then
  echo "usage: scripts/dev_module.sh [module (theModule)]"
  exit 0
fi

module=${BASH_ARGV[0]}

echo "[INFO] to create module: ${module}"
pcreate -s module . ${module}

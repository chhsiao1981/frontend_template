#!/bin/bash


if [ "${BASH_ARGC}" != "1" ]
then
  echo "usage: scripts/dev_subcontainer.sh [module (theModule)]"
  exit 0
fi

module=${BASH_ARGV[0]}

echo "[INFO] to create subcontainer: ${module}"
pcreate -s subcontainer . ${module}

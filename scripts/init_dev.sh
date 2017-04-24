#!/bin/bash

if [ "${BASH_ARGC}" != "1" ]
then
  virtualenv_dir="__"
else
  virtualenv_dir="${BASH_ARGV[0]}"
fi

the_basename=`basename \`pwd\``

echo "virtualenv_dir: ${virtualenv_dir} the_basename: ${the_basename}"

if [ ! -d ${virtualenv_dir} ]
then
  echo "no ${virtualenv_dir}. will create one"
  virtualenv -p `which python` --prompt="[${the_basename}] " "${virtualenv_dir}"
fi

source ${virtualenv_dir}/bin/activate
the_python_path=`which python`
echo "python: ${the_python_path}"

echo "current_dir: "
pwd

# remove files from create-react-app
rm src/index.js
rm package.json

# cp all to current dir
rm -rf frontend_template/.git*
ln frontend_template/setup.py ./
ln -s frontend_template/scaffolds ./
ln -s frontend_template/scripts ./
ln -s frontend_template/config.js.tmpl ./

# requires
pip install pyramid==1.7
pip install sniffer

# post setup
python setup.py develop

rm setup.py
rm -rf .git

pcreate -s init_starter .
rm -rf app.egg-info

python setup.py develop

git init; git add .; git commit -m "init dev"

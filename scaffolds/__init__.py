# API
from pyramid.scaffolds import PyramidTemplate
import os
import re
import logging

def _camelcase_to_upper_camel_case(the_str):
    if not the_str:
        return ''

    return the_str[0].upper() + the_str[1:]


def _upper_camelcase_to_camelcase(the_str):
    if not the_str:
        return ''

    return the_str[0].lower() + the_str[1:]


def _camelcase_to_constant(the_str):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', the_str)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).upper()


class MyTemplate(PyramidTemplate):
    def pre(self, command, output_dir, vars):
        the_args = command.args

        module_name = '' if not isinstance(the_args, list) or len(the_args) < 2 else the_args[1]

        logging.warning('command: %s output_dir: %s vars: %s args: %s module_name: %s', command, output_dir, vars, command.args, module_name)

        self._setup_module(vars, module_name)

        return PyramidTemplate.pre(self, command, output_dir, vars)

    def _setup_module(self, vars, full_module_name):
        full_module_path = full_module_name.replace('.', os.path.sep)

        module_name = os.path.basename(full_module_path)
        class_name = _camelcase_to_upper_camel_case(module_name)

        constant_name = _camelcase_to_constant(module_name)

        sub_pkg_dir = os.path.dirname(full_module_path)
        sub_pkg_name = sub_pkg_dir.replace(os.path.sep, '.')

        test_name = '' if not module_name else 'test' + class_name
        sub_pkg_dir_list = [] if not sub_pkg_dir else sub_pkg_dir.split(os.path.sep)
        test_dir_list = ['test_' + each_pkg for each_pkg in sub_pkg_dir_list]
        test_dir = os.path.sep.join(test_dir_list)
        pkg_name = vars['package']
        if sub_pkg_name:
            pkg_name += '.' + sub_pkg_name

        vars['module_name'] = module_name
        vars['class_name'] = class_name
        vars['sub_pkg_name'] = sub_pkg_name
        vars['sub_pkg_dir'] = sub_pkg_dir
        vars['constant_name'] = constant_name
        vars['test_name'] = test_name
        vars['test_dir'] = test_dir
        vars['pkg_name'] = pkg_name


class ComponentProjectTemplate(MyTemplate):
    _template_dir = 'component'
    summary = 'component'


class ContainerProjectTemplate(MyTemplate):
    _template_dir = 'container'
    summary = 'container'


class SubContainerProjectTemplate(MyTemplate):
    _template_dir = 'subcontainer'
    summary = 'subcontainer'


class ReducerProjectTemplate(MyTemplate):
    _template_dir = 'reducer'
    summary = 'reducer'


class InitStarterProjectTemplate(MyTemplate):
    _template_dir = 'init_starter'
    summary = 'including store / middleware / utils'


class InitDevProjectTemplate(MyTemplate):
    _template_dir = 'init_dev'
    summary = 'starting project'

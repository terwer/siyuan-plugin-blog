# Copyright (c) 2022 Landray Authors. All Rights Reserved.
# @author terwer on 2023/2/21
# ========================================================

def get_dict_int_value(vo, key):
    """
    根据key从字段获取整数，如果key不存在，返回0
    :param vo: 字典
    :param key: key
    """
    val = get_dict_value(vo, key)
    if val is None:
        return 0
    return int(vo[key])


def get_dict_str_value(vo, key):
    """
    根据key从字段获取字符串，如果key不存在，返回空字符串
    :param vo: 字典
    :param key: key
    """
    val = get_dict_value(vo, key)
    if val is None:
        return ""
    return vo[key]


def get_dict_value(vo, key):
    """
    根据key从字段获取值，如果key不存在，返回None
    :param vo: 字典
    :param key: key
    """
    if key not in vo:
        return None
    return vo[key]

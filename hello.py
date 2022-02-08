
def test(param1, param2):
    if param1 % 2 == 0:
        res = param1 + 1
    elif param2 % 2 == 0:
        res = param2 + 1
    else:
        res = param1 + param2
    
    return res
print(test(3, 11))
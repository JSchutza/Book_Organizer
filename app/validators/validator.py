





def check_if_empty(to_check):
  if len(to_check) == 0:
    return True
  else:
    return False


def check_right_length(to_check):
  if len(to_check) < 6:
    return True
  else:
    return False




def check_lengths(*things):
  result = None
  for each in things:
    if len(each) == 0:
      return True
    else:
      result = False
  return result

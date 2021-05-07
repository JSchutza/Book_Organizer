from random import randint



def gen_search_id(the_input):
  number = 0
  for each in the_input:
    try:
      if int(each):
        number = number + int(each) * randint(1, 1000)
    except ValueError:
      continue

  result = str(the_input[0]) + str(number)
  return result

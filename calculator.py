def multiply(x, y):
    return x * y

def addition(x, y):
    return x + y

def subtraction(x, y):
    return x - y

def division(x, y):
    while y == 0:
        y = int(input("Please choose another number. It cannot be 0: "))
    return x / y

def remainder(x, y):
    while y == 0:
        y = int(input("Please choose another number. It cannot be 0: "))
    return x % y

if __name__ == "__main__":
    x = int(input("Welcome! Choose your first number: "))
    inputAnother = "y"

    while inputAnother.lower() == "y":
        method = input("Method: ")
        y = int(input("Choose your next number: "))

        if method == "*":
            x = multiply(x, y)
        elif method == "+":
            x = addition(x, y)
        elif method == "-":
            x = subtraction(x, y) 
        elif method == "/":
            x = division(x, y)
        elif method == "%":
            x = remainder(x, y)
        else:
            print("Invalid method")
        print(f"The result is: {x}")

        inputAnother = input("Would you like to choose another number? (y/n): ")

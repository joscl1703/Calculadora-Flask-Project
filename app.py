from flask import Flask, render_template, request

app = Flask(__name__, static_folder="static", static_url_path="/public")
app.jinja_env.auto_reload = True
app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/calculator")
def calculator():
    return render_template("calculator.html")


@app.route("/calculator/sum")
def sum():

    a = float(request.args.get("a"))
    b = float(request.args.get("b"))
    c = a + b

    return render_template("calculator.html", resultado=c)


@app.route("/calculator/rest")
def rest():

    a = float(request.args.get("a"))
    b = float(request.args.get("b"))
    c = a - b

    return render_template("calculator.html", resultado=c)


@app.route("/calculator/multiply")
def multiply():

    a = float(request.args.get("a", 0))
    b = float(request.args.get("b", 0))
    c = a * b
    return render_template("calculator.html", resultado=c)


@app.route("/calculator/split")
def division():

    a = float(request.args.get("a", 0))
    b = float(request.args.get("b", 0))

    if b == 0:

        return render_template("calculator.html", resultado="Error")

    else:

        return render_template("calculator.html", resultado=a / b)


if __name__ == "__main__":
    app.run(debug=True)

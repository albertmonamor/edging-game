from flask import render_template, render_template_string
from api.protocol import M_APP



# // --- HOME (html) ---
@M_APP.route("/")
@M_APP.route("/home")
def home():

    return render_template("index.html")

@M_APP.route("/jet")
def jet():
    return render_template_string(
        "https://code-with-me.global.jetbrains.com/UtLi6l2i1ig11QV6BwGNIw#p=PC&fp=2A20EC5B9B7DD2C6AD2B743B01168A6C0B9BAB3CCB212A51C5E5AA589F9D28C3&newUi=true")



if __name__ == "__main__":

    M_APP.run(host="0.0.0.0", port=80, debug=True)




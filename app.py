from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/html_example')
def html_page():
    page = """
    <!DOCTYPE html>
    <html>
    <body>

    <h1>This is a heading</h1>

    <p>This is a paragraph.</p>

    </body>
    </html>
    """
    return page


if __name__ == '__main__':
    port = 45123
    app.run(debug=True, host="delta-tomcat-vm", port=port)

    # inc = True
    # while inc:
    #     try:
    #         inc = False
    #         print(f"Running on http://delta-tomcat-vm.cs.tau.ac.il:{port}/")
    #         app.run(debug=True, port=port)
    #     except OSError:
    #         port += 1

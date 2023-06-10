from flask import Flask

app = Flask(__name__)


# Setting up Flask app
def create_app() -> object:
    app.config['SECRET_KEY'] = 'o7'
    app.config["DEBUG"] = True

    from .views import views

    app.register_blueprint(views, url_prefix='/')

    return app


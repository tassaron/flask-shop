from flask import render_template
from tassaron_flask.blueprint import Blueprint
from tassaron_flask.helpers.main.markdown import render_markdown


blueprint = Blueprint(
    "about",
    __name__,
)


@blueprint.index_route()
def about_page():
    return render_template("about.html", about=render_markdown("about.md"))

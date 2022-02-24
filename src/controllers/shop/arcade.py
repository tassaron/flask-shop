"""
This shop has an arcade inside. How cool!
"""
from flask import session, render_template, abort, request
from muffin_shop.blueprint import Blueprint


arcade_games = {
    "speed-limit": {
        "title": "Speed Limit",
        "style": "width: 640px; height: 598px;",
        "multiplier": 0.01,
    },
    "rodents-revenge": {
        "title": "Rodent's Revenge",
        "style": "background:purple; width: 912px; height: 1036px; border: 2px solid black;",
        "multiplier": 0.1,
    },
}


blueprint = Blueprint(
    "arcade",
    __name__,
)


@blueprint.app_context_processor
def inject_arcade_tokens():
    return {
        "arcade_tokens": session["arcade_tokens"],
    }


@blueprint.before_app_request
def create_arcade_session():
    if "arcade_tokens" not in session:
        session["arcade_tokens"] = 100


@blueprint.route("/game/<filename>")
def game_page(filename):
    if filename not in ("rodents-revenge", "speed-limit"):
        abort(404)
    return render_template(
        "arcade/game_page.html",
        title=arcade_games[filename]["title"],
        filename=filename,
        style=f"--bs-gutter-x: 0; margin:auto; position: relative; {arcade_games[filename]['style']}",
    )


@blueprint.route("/token/submit", methods=["POST"])
def token_submit():
    data = request.get_json()
    if data["filename"] not in arcade_games:
        abort(400)
    try:
        new_score = int(int(data["score"]) * arcade_games[data["filename"]]["multiplier"])
        session["arcade_tokens"] += new_score
        return {"payout": new_score}
    except (KeyError, ValueError, TypeError):
        abort(400)
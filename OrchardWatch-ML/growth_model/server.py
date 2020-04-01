"""
Documentation

See also https://www.python-boilerplate.com/flask
"""
import os
import argparse
from flask import request
from flask_api import FlaskAPI, status, exceptions
# from flask_cors import CORS
from logzero import logger

def create_app(config=None):
    app = FlaskAPI(__name__)
    app.config.update(dict(DEBUG=True))
    app.config.update(config or {})
    # CORS(app)

    @app.route("/tree", methods=['POST'])
    def get_num_clusters():
        logger.warning(f"POST /tree")
        image = request.files["image"]
        return '', status.HTTP_501_NOT_IMPLEMENTED

    @app.route("/cluster", methods=['POST'])
    @app.route("/cluster/<int:cluster_num>", methods=['POST'])
    def label_apples(cluster_num=None):
        logger.info(f"POST /cluster/{cluster_num}")
        image = request.files["image"]
        if cluster_num is None:
            # make new cluster
            pass
        else:
            # add to existing cluster
            pass
        return '', status.HTTP_501_NOT_IMPLEMENTED

    # technically this can be consolidated into label_apples, but
    # I put it separately for readability
    @app.route("/cluster/<int:cluster_num>", methods=['GET'])
    def get_cluster_data(cluster_num):
        logger.info(f"GET /cluster/{cluster_num}")
        # well, get the data.
        return '', status.HTTP_501_NOT_IMPLEMENTED

    return app


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", action="store", default="8000")

    args = parser.parse_args()
    port = int(args.port)
    app = create_app()
    app.run(host="0.0.0.0", port=port)
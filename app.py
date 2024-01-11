from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
import joblib

pipeline = joblib.load('spam_classifier.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email_text = data['emailText']

    # Get prediction from the model
    prediction = pipeline.predict([email_text])[0]
    result = {'prediction': 'spam' if prediction == 0 else 'ham'}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
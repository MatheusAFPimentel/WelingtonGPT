from flask import Flask, render_template, request, jsonify
import requests
import json

app = Flask(__name__)

API_KEY = "APYKEY"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    user_input = request.form['user_input']

    body_message = {
        "model": "gpt-3.5-turbo", 
        "messages": [{"role": "user", "content": user_input}]
    }

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    link = "https://api.openai.com/v1/chat/completions"

    response = requests.post(link, headers=headers, json=body_message)
    data = response.json()
    message = data["choices"][0]["message"]["content"]

    return jsonify({'message': message})

if __name__ == '__main__':
    app.run(debug=True)

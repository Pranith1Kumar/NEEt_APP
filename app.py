from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import json, sqlite3, requests, os

app = Flask(__name__)
CORS(app)

# === DB Setup ===
HOME_DIR = os.path.expanduser("~")
DB_PATH = os.path.join(HOME_DIR, "data.db")

# Create an empty DB file if it doesn't exist
if not os.path.exists(DB_PATH):
    open(DB_PATH, 'a').close()

conn = sqlite3.connect(DB_PATH, check_same_thread=False)
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS users (name TEXT, email TEXT, phone TEXT)''')
conn.commit()

# === Routes ===

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    name, email, phone = data["name"], data["email"], data["phone"]
    rank, category, quota = int(data["rank"]), data["category"].upper(), data["quota"]

    # Store user data
    cursor.execute("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)", (name, email, phone))
    conn.commit()

    # Load cutoff data
    with open("cutoffs.json") as f:
        colleges = json.load(f)

    results = []
    for clg in colleges:
        for branch in clg["branches"]:
            cut = branch["cutoffs"].get(quota, {})
            if cut.get(category) and rank <= cut[category]:
                results.append({
                    "College": clg["name"],
                    "Branch": branch["name"],
                    "Available Seats": branch.get("seats")
                })
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

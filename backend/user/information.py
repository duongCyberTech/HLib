from flask import Flask, jsonify, request
import pymysql

app = Flask(__name__)

# Kết nối MySQL
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='sonphanak', 
    database='hcmutlib',
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/users', methods = ["GET"])
def get_users():
    with conn.cursor() as cursor:
        cursor.execute("SELECT uid, fname, lname, email, status, role FROM users")
        users = cursor.fetchall()
    return jsonify(users)

@app.route('/users/<uid>', methods = ["GET"])
def get_user(uid):
    with conn.cursor() as cursor:
        cursor.execute("SELECT uid, fname, lname, email, status, role FROM users")
        user = cursor.fetchall()
    return jsonify(user)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No data"}), 400

    with conn.cursor() as cursor:
        cursor.execute("""
                        INSERT INTO users (fname, lname, email, status, role)
                        VALUES (%s, %s, %s, %s, %s)
                        """, (
                        data.get('fname'),
                        data.get('lname'),
                        data.get('email'),
                        data.get('status'),
                        data.get('role'),
                    )
        )
        new_id = cursor.lastrowid
    conn.commit()
    return jsonify({"message": "Created", "uid": new_id}), 201

@app.route('/users/<uid>', methods = ["PUT"])
def update_data(uid):
    data = request.get_json(silent = True) # slient = True tức là ko trả về lỗi nếu body rỗng
    if not data:
        return jsonify({"error": "No data"}), 400
    else:
        with conn.cursor() as cursor:
            cursor.execute("""
                           UPDATE users
                           SET fname=%s, lname=%s, email=%s, status=%s, role=%s
                           WHERE uid=%s
                           """,(
                               data.get('fname'),
                               data.get('lname'),
                               data.get('email'),
                               data.get('status'),
                               data.get('role'),
                               uid
                           )
            )
            conn.commit() # lưu thay đổi
            return jsonify({"message": "Data updated"}), 200

@app.route('/users/<uid>', methods=['DELETE'])
def delete_user(uid):
    with conn.cursor() as cursor:
        cursor.execute("SELECT uid FROM users WHERE uid=%s", (uid,))
        if cursor.fetchone() is None:
            return jsonify({"error": "User not found"}), 404

        cursor.execute("DELETE FROM users WHERE uid=%s", (uid,))
    conn.commit()
    return jsonify({"message": "Deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)

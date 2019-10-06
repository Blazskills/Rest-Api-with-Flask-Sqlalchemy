from flask import Flask ,redirect, url_for, render_template, request, flash, session, jsonify
from flask_login import LoginManager,UserMixin,login_user, logout_user, login_required,current_user
from sqlalchemy.exc import IntegrityError,InvalidRequestError
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
from datetime import datetime
import os
import sqlite3
from random import randint
from flask_marshmallow import Marshmallow


# con = sqlite3.connect('./tmp/database.db')

app = Flask(__name__)
basedir=os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir,'database.db')
app.config['SECRET_KEY'] = 'JIHDGJIDHFHJDFJ'

db = SQLAlchemy(app)
ma = Marshmallow(app)


class membertb(db.Model):
       id = db.Column(db.Integer,primary_key=True)
       fname = db.Column(db.String(255))
       email= db.Column(db.String(255))
       random = db.Column(db.Integer)
       today=db.Column(db.DateTime, nullable=False, default=datetime.utcnow)





class UserSchema(ma.ModelSchema):
    class Meta:
        # fields =('fname', 'email', 'random','id')
        model=membertb



#post new user/create new user
@app.route('/users', methods=['POST'])
def user():
        user_schema =UserSchema(strict=True)
        fname = request.json['fname']
        email = request.json['email']
        new_user = membertb(fname=fname, email=email)
        new_user.random =randint(1,1000)
        db.session.add(new_user)
        db.session.commit()
        return user_schema.jsonify(new_user)
    


#end point to show all user data
@app.route('/users', methods=['GET'])
def api_user():
    users = membertb.query.all()
    user_schema = UserSchema(many=True)
    output =user_schema.dump(users).data
    return jsonify({'user' : output})


#end point to get user by id
@app.route("/users/<id>",methods=['GET'])
def user_detail(id):
    user = membertb.query.filter_by(id=id)
    user_schema = UserSchema(many=True)
    output =user_schema.dump(user).data
    if (len(output) > 0):
        return jsonify({'user' : output})
    return jsonify({'Message' : "Id not Found"})


#update users in database
@app.route('/users/<id>', methods=['PUT'])
def update_users(id):
        user_schema =UserSchema(strict=True)
        members= membertb.query.filter_by(id=id).first()
        if members:
            fname = request.json['fname']
            email = request.json['email']
            members.fname=fname
            members.email=email
            db.session.commit()
            return user_schema.jsonify(members)
        return jsonify({'Message' : "Wrong update"})

#delete user from the database
@app.route("/users/<id>",methods=['DELETE'])
def delete_detail(id):
    user_schema = UserSchema(strict=True)
    user = membertb.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'Message' : "deleted"})
    return jsonify({'Message' : "Id does not exist to be deleted"})






if __name__ == "__main__":
    app.run(port=5000 ,debug=True)
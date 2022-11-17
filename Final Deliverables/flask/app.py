from django.shortcuts import render
from flask import Flask, render_template, request, jsonify
import os
import numpy as np 
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import requests

app = Flask(__name__, template_folder="templates")

#loading the model 
model = load_model('nutrition.h5')
print("Loaded model from disk")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/image1', methods = ['GET', 'POST'])
def image1():
    return render_template("imageprediction.html")

@app.route('/predict', methods=['GET', 'POST'])
def launch():
    if request.method == 'POST':
        f = request.files['file']
        basepath = os.path.dirname('__file__')
        filepath = os.path.join(basepath, "uploads", f.filename)
        f.save(filepath)

        img = image.load_img(filepath, target_size = (64,64))
        x = image.img_to_array(img)
        x = np.expand_dims(x,axis=0)

        pred = np.argmax(model.predict(x), axis = 1)
        print("prediction", pred)
        index = ['APPLES', 'BANANA', 'ORANGE', 'PINEAPPLE', 'WATERMELON']

        result = str(index[pred[0]])

        x = result
        print(x)
        result = nutrition(result)
        print(result)

        return result

def nutrition(index):
    url ="https://calorieninjas.p.rapidapi.com/v1/nutrition"
    querystring = {"query":index}
    headers={
        'x-rapidapi-key':"dc1e98c6d3mshbe873185ccae8b7p1eb62djsn34216d967ce7",
        'x-rapidapi-host':"calorieninjas.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    print(response.text)
    return response.json()['items']

if __name__ == "__main__":
  app.run(debug=False)


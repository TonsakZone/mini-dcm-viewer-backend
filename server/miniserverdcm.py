from flask import Flask, request
import numpy as np
import pydicom
from PIL import Image
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/conv', methods=['POST','GET'])
def convertIMG():
    name = request.args['img']
    im = pydicom.dcmread(name)
    im = im.pixel_array.astype(float)
    rescaled_img = (np.maximum(im,0)/im.max())*255
    final = np.uint8(rescaled_img)
    final = Image.fromarray(final)
    final.save("../conv/img/convert.jpg")
    return name

@app.route('/hello', methods=['GET'])
def saySomething():
    message = "This is a word from flask server"
    return message


if __name__ == "__main__":
    app.run(debug=True, port=5000)

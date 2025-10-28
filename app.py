import os
import numpy as np
from flask import Flask, render_template, request
from wine_quality_prediction.pipeline.prediction import PredictionPipeline

app = Flask(__name__) #initialize a flask app

@app.route('/', methods = ['GET']) # route to homepage
def homePage():
    return render_template("index.html")


@app.route('/train-page', methods=['GET'])
def train_page():
    return render_template("train_page.html")

@app.route('/error-demo', methods=['GET'])
def error_demo():
    return render_template('error.html', 
                          error_message="This is a demo error page. You can test the error page design here.",
                          error_details="Error Code: DEMO-001\nThis is just a demonstration of how errors will be displayed.")

@app.route('/train', methods=['GET']) 
def training():
    try:
        os.system("python main.py")
        return "Training Successful"
    except Exception as e:
        return render_template('error.html', error_message="Training failed", error_details=str(e))

@app.route('/predict', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        try:
            # reading inputs
            fixed_acidity =         float(request.form['fixed_acidity'])
            volatile_acidity =      float(request.form['volatile_acidity'])
            citric_acid   =         float(request.form['citric_acid'])
            residual_sugar =        float(request.form['residual_sugar'])
            chlorides   =           float(request.form['chlorides'])
            free_sulfur_dioxide =   float(request.form['free_sulfur_dioxide'])
            total_sulfur_dioxide  = float(request.form['total_sulfur_dioxide'])
            density  =              float(request.form['density'])
            pH  =                   float(request.form['pH'])
            sulphates =             float(request.form['sulphates'])
            alcohol  =              float(request.form['alcohol'])
            
            data = [fixed_acidity, volatile_acidity, citric_acid, residual_sugar, chlorides, free_sulfur_dioxide, total_sulfur_dioxide, density, pH, sulphates, alcohol]
            data = np.array(data).reshape(1, 11)
            
            obj = PredictionPipeline()
            predict = obj.predict(data)
            
            return render_template('results.html', prediction = str(predict))
            
        except Exception as e:
            print("The Exception message is : ", e)
            return render_template('error.html', error_message="Prediction failed. Please check your inputs or ensure the model is trained.", error_details=str(e))
        
    else:
        return render_template("index.html")
    
if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 8000, debug = True)
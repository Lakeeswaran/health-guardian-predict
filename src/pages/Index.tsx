
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { Heart, Brain, HeartPulse } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <section className="mb-16 text-center">
        <div className="animate-fade-in">
          <HeartPulse className="inline-block h-16 w-16 text-medical-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-medical-900">
            Patient's Sickness & Stroke Prediction System
          </h1>
          <p className="text-xl text-medical-700 max-w-3xl mx-auto">
            Advanced healthcare prediction powered by machine learning algorithms to enhance early diagnosis 
            and support medical decision-making.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button className="health-btn text-lg px-6 py-3" asChild>
            <Link to="/sickness">Predict Sickness</Link>
          </Button>
          <Button className="health-btn-secondary text-lg px-6 py-3" asChild>
            <Link to="/stroke">Detect Stroke Risk</Link>
          </Button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-medical-900 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="health-card">
            <CardHeader>
              <div className="mx-auto rounded-full bg-medical-100 p-3 w-16 h-16 flex items-center justify-center">
                <Heart className="h-8 w-8 text-medical-500" />
              </div>
              <CardTitle className="text-center text-xl mt-2">Input Your Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Enter your symptoms, medical history, and relevant health information into our secure system.
              </p>
            </CardContent>
          </Card>
          
          <Card className="health-card">
            <CardHeader>
              <div className="mx-auto rounded-full bg-medical-100 p-3 w-16 h-16 flex items-center justify-center">
                <Brain className="h-8 w-8 text-medical-500" />
              </div>
              <CardTitle className="text-center text-xl mt-2">ML Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Our machine learning algorithms process and analyze your data against validated healthcare models.
              </p>
            </CardContent>
          </Card>
          
          <Card className="health-card">
            <CardHeader>
              <div className="mx-auto rounded-full bg-medical-100 p-3 w-16 h-16 flex items-center justify-center">
                <HeartPulse className="h-8 w-8 text-medical-500" />
              </div>
              <CardTitle className="text-center text-xl mt-2">Get Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Receive detailed prediction results with actionable insights for better health management.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <div className="bg-medical-500 text-white rounded-lg p-8 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">About Our Technology</h2>
            <p className="mb-6">
              Our system utilizes advanced machine learning algorithms including Random Forest, 
              Logistic Regression, and Neural Networks to provide accurate predictions based on 
              extensive healthcare datasets and clinical research.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-semibold">Decision Trees</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-semibold">Random Forest</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-semibold">Logistic Regression</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-semibold">XGBoost</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-medical-900 mb-6 text-center">Our Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Sickness Prediction</CardTitle>
              <CardDescription>Predict potential illnesses based on symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our sickness prediction module analyzes your symptoms, age, gender, medical history, 
                and lifestyle factors to identify the most probable illness you may be experiencing.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Comprehensive symptom analysis</li>
                <li>Medical history consideration</li>
                <li>Age and gender-specific predictions</li>
                <li>Multiple illness detection</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="health-btn w-full" asChild>
                <Link to="/sickness">Try Sickness Prediction</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Stroke Detection</CardTitle>
              <CardDescription>Identify stroke risk based on health metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The stroke detection module evaluates your risk based on age, hypertension, 
                heart disease, glucose level, BMI, smoking status, and other clinical indicators.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Clinical risk factor analysis</li>
                <li>Personalized risk score</li>
                <li>Preventive recommendations</li>
                <li>Early warning indicators</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="health-btn w-full" asChild>
                <Link to="/stroke">Try Stroke Detection</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <div className="mt-16 text-center text-medical-700 text-sm">
        <p>DISCLAIMER: This system is for educational and informational purposes only.</p>
        <p>It is not intended to replace professional medical advice, diagnosis, or treatment.</p>
      </div>
    </Layout>
  );
};

export default Index;

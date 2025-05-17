
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StrokeDetectionForm } from '@/components/stroke-detection/StrokeDetectionForm';
import { StrokeDetectionResult } from '@/components/stroke-detection/StrokeDetectionResult';

const StrokeDetection = () => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResult = (score: number) => {
    setResult(score);
    setLoading(false);
  };

  const handleFormSubmit = () => {
    setLoading(true);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Stroke Risk Detection</h1>
        <p className="text-medical-700 mb-8">
          Enter health information to assess stroke risk probability based on clinical factors.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Stroke Risk Assessment</CardTitle>
                <CardDescription>
                  Please provide accurate information for better risk prediction results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StrokeDetectionForm 
                  onResult={handleResult} 
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <StrokeDetectionResult 
              result={result} 
              loading={loading} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StrokeDetection;

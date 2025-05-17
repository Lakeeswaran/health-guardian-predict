
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface StrokeDetectionResultProps {
  result: number | null;
  loading: boolean;
}

export const StrokeDetectionResult: React.FC<StrokeDetectionResultProps> = ({ result, loading }) => {
  const getRiskCategory = (score: number) => {
    if (score >= 70) return "high";
    if (score >= 40) return "medium";
    return "low";
  };

  return (
    <Card className="health-card sticky top-8">
      <CardHeader>
        <CardTitle>Risk Assessment Results</CardTitle>
        <CardDescription>Stroke risk probability</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full border-4 border-medical-500 border-t-transparent animate-spin"></div>
            <p className="text-medical-700">Analyzing risk factors...</p>
          </div>
        ) : result !== null ? (
          <div className="space-y-6">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-medical-600 bg-medical-100">
                    Risk Score
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-medical-700">
                    {result}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-medical-100">
                <div
                  style={{ width: `${result}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    getRiskCategory(result) === "high"
                      ? "bg-danger-500"
                      : getRiskCategory(result) === "medium"
                      ? "bg-yellow-500"
                      : "bg-success-500"
                  }`}
                ></div>
              </div>
            </div>

            <div className="bg-medical-50 p-4 rounded-lg border border-medical-100">
              {getRiskCategory(result) === "high" ? (
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-danger-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-danger-900">High Risk</h4>
                    <p className="text-sm text-danger-700">
                      The patient has multiple significant risk factors for stroke. Immediate medical consultation is recommended.
                    </p>
                  </div>
                </div>
              ) : getRiskCategory(result) === "medium" ? (
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Medium Risk</h4>
                    <p className="text-sm text-yellow-700">
                      The patient has some risk factors for stroke. Regular check-ups and lifestyle modifications are advised.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-success-900">Low Risk</h4>
                    <p className="text-sm text-success-700">
                      The patient has few risk factors for stroke. Maintaining a healthy lifestyle is recommended.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600 mt-6 border-t pt-4">
              <p className="mb-2">
                This is only a prediction based on the information provided and should not be considered a medical diagnosis.
              </p>
              <p className="font-medium">
                Please consult with a healthcare professional for proper evaluation.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Complete the form to get the stroke risk assessment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

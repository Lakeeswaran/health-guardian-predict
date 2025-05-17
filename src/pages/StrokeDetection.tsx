import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface StrokeFormData {
  patientName: string;
  age: string;
  gender: string;
  hypertension: string;
  heartDisease: string;
  married: string;
  workType: string;
  residenceType: string;
  glucoseLevel: string;
  bmi: string;
  smokingStatus: string;
  alcoholConsumption: string;
}

const StrokeDetection = () => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<StrokeFormData>({
    defaultValues: {
      patientName: '',
      age: '',
      gender: '',
      hypertension: '',
      heartDisease: '',
      married: '',
      workType: '',
      residenceType: '',
      glucoseLevel: '',
      bmi: '',
      smokingStatus: '',
      alcoholConsumption: ''
    }
  });

  const onSubmit = (data: StrokeFormData) => {
    setLoading(true);
    
    // In a real app, this would be an API call to a machine learning model
    setTimeout(() => {
      console.log("Stroke risk form data submitted:", data);
      
      // Calculate a mock risk score based on known risk factors
      // This is just for demonstration - a real app would use a proper ML model
      let riskScore = 0;
      
      // Age is a significant factor
      const age = parseInt(data.age);
      if (age > 65) riskScore += 30;
      else if (age > 55) riskScore += 20;
      else if (age > 45) riskScore += 10;
      
      // Medical conditions
      if (data.hypertension === 'yes') riskScore += 20;
      if (data.heartDisease === 'yes') riskScore += 20;
      
      // Lifestyle factors
      if (data.smokingStatus === 'smokes') riskScore += 15;
      else if (data.smokingStatus === 'formerly-smoked') riskScore += 5;
      
      if (data.alcoholConsumption === 'heavy') riskScore += 15;
      else if (data.alcoholConsumption === 'moderate') riskScore += 8;
      else if (data.alcoholConsumption === 'light') riskScore += 3;
      
      // Other factors
      try {
        const glucoseLevel = parseFloat(data.glucoseLevel);
        if (glucoseLevel > 6) riskScore += 15;
      } catch (e) {}
      
      try {
        const bmi = parseFloat(data.bmi);
        if (bmi > 30) riskScore += 10;
        else if (bmi > 25) riskScore += 5;
      } catch (e) {}
      
      setResult(Math.min(riskScore, 100)); // Cap at 100%
      setLoading(false);
      
      toast({
        title: "Stroke Risk Analysis Complete",
        description: "The risk analysis has been completed successfully.",
      });
    }, 1500);
  };

  const getRiskCategory = (score: number) => {
    if (score >= 70) return "high";
    if (score >= 40) return "medium";
    return "low";
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter patient's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter age" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="hypertension"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hypertension</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Does the patient have hypertension?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="heartDisease"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heart Disease</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Does the patient have heart disease?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="married"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ever Married</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Has the patient ever been married?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="workType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select work type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="private">Private</SelectItem>
                                <SelectItem value="self-employed">Self-employed</SelectItem>
                                <SelectItem value="govt">Government</SelectItem>
                                <SelectItem value="children">Children</SelectItem>
                                <SelectItem value="never-worked">Never worked</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="residenceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Residence Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select residence type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="urban">Urban</SelectItem>
                                <SelectItem value="rural">Rural</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="glucoseLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Average Glucose Level (mmol/L)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 5.5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="bmi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>BMI</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 24.8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="smokingStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Smoking Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select smoking status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="never-smoked">Never Smoked</SelectItem>
                                <SelectItem value="formerly-smoked">Formerly Smoked</SelectItem>
                                <SelectItem value="smokes">Currently Smokes</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="alcoholConsumption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alcohol Consumption</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select alcohol consumption level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="light">Light (1-2 drinks/week)</SelectItem>
                              <SelectItem value="moderate">Moderate (3-7 drinks/week)</SelectItem>
                              <SelectItem value="heavy">Heavy (8+ drinks/week)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="health-btn w-full" 
                      disabled={loading}
                    >
                      {loading ? "Analyzing Risk..." : "Calculate Stroke Risk"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StrokeDetection;

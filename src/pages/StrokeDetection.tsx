import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface StrokeFormData {
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
}

const StrokeDetection = () => {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  
  const form = useForm<StrokeFormData>({
    defaultValues: {
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
    }
  });

  const onSubmit = (data: StrokeFormData) => {
    setLoading(true);
    
    // In a real application, this would call a ML model API
    // This is a mock implementation for demonstration
    setTimeout(() => {
      console.log("Stroke risk form data submitted:", data);
      
      // Create a simple mock risk score based on entered data
      let riskScore = 0;
      
      // Age risk
      const age = parseInt(data.age);
      if (age > 65) riskScore += 30;
      else if (age > 45) riskScore += 15;
      else if (age > 30) riskScore += 5;
      
      // Health conditions risk
      if (data.hypertension === "yes") riskScore += 20;
      if (data.heartDisease === "yes") riskScore += 20;
      
      // Other factors
      if (data.glucoseLevel && parseFloat(data.glucoseLevel) > 140) riskScore += 15;
      if (data.bmi && parseFloat(data.bmi) > 30) riskScore += 10;
      if (data.smokingStatus === "formerly-smoked" || data.smokingStatus === "smokes") riskScore += 10;
      
      // Cap the score at 100
      riskScore = Math.min(riskScore, 100);
      
      // Generate recommendations based on risk factors
      const newRecommendations: string[] = [];
      
      if (data.hypertension === "yes") {
        newRecommendations.push("Maintain regular blood pressure monitoring and follow prescribed medication regimen");
      }
      
      if (data.heartDisease === "yes") {
        newRecommendations.push("Continue cardiac care under medical supervision and attend regular check-ups");
      }
      
      if (data.glucoseLevel && parseFloat(data.glucoseLevel) > 140) {
        newRecommendations.push("Monitor blood glucose levels and consider consulting with an endocrinologist");
      }
      
      if (data.bmi && parseFloat(data.bmi) > 30) {
        newRecommendations.push("Consider a weight management program to reduce BMI to a healthy range");
      }
      
      if (data.smokingStatus === "formerly-smoked" || data.smokingStatus === "smokes") {
        newRecommendations.push("Quit smoking or maintain smoking cessation to reduce stroke risk");
      }
      
      // Always add these general recommendations
      newRecommendations.push("Maintain a balanced diet rich in fruits, vegetables, and whole grains");
      newRecommendations.push("Engage in regular physical activity for at least 150 minutes per week");
      
      setResult(riskScore);
      setRecommendations(newRecommendations);
      setLoading(false);
      
      toast({
        title: "Risk Assessment Complete",
        description: "Your stroke risk analysis has been completed.",
      });
    }, 1500);
  };

  const getRiskCategory = (score: number | null): string => {
    if (score === null) return "";
    if (score < 20) return "Low Risk";
    if (score < 50) return "Moderate Risk";
    return "High Risk";
  };
  
  const getRiskColor = (score: number | null): string => {
    if (score === null) return "bg-gray-200";
    if (score < 20) return "bg-success-500";
    if (score < 50) return "bg-yellow-500";
    return "bg-danger-500";
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Stroke Risk Detection</h1>
        <p className="text-medical-700 mb-8">Enter your health metrics to assess your risk of stroke and get personalized recommendations.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Stroke Risk Assessment Form</CardTitle>
                <CardDescription>Please provide accurate information for better risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter your age" {...field} />
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
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-medical-800">Health Conditions</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="hypertension"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hypertension</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex space-x-4"
                                >
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="yes" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="no" />
                                    </FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
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
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex space-x-4"
                                >
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="yes" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="no" />
                                    </FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="glucoseLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Glucose Level (mg/dL)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter glucose level" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bmi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>BMI</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" placeholder="Enter BMI" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
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
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="never-smoked">Never Smoked</SelectItem>
                              <SelectItem value="formerly-smoked">Former Smoker</SelectItem>
                              <SelectItem value="smokes">Current Smoker</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="married"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marital Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Married</SelectItem>
                                <SelectItem value="no">Not Married</SelectItem>
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
                                <SelectItem value="never-worked">Never Worked</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
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
                    
                    <Button 
                      type="submit" 
                      className="health-btn w-full" 
                      disabled={loading}
                    >
                      {loading ? "Analyzing..." : "Calculate Stroke Risk"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="health-card sticky top-8">
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Your stroke risk calculation</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 mx-auto mb-4 rounded-full border-4 border-medical-500 border-t-transparent animate-spin"></div>
                    <p className="text-medical-700">Calculating risk score...</p>
                  </div>
                ) : result !== null ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Risk Score:</h4>
                        <span className="text-xl font-semibold">{result}%</span>
                      </div>
                      <Progress value={result} className={`h-3 ${getRiskColor(result)}`} />
                      <div className="mt-2 text-right font-medium">
                        {getRiskCategory(result)}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Recommendations:</h4>
                      <ul className="space-y-2">
                        {recommendations.map((recommendation, index) => (
                          <li key={index} className="bg-medical-50 p-2 rounded-md text-sm flex">
                            <span className="mr-2">•</span>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-sm text-gray-600 border-t pt-4 mt-4">
                      <p className="mb-2">This assessment is based on general risk factors and should not replace professional medical advice.</p>
                      <p className="font-medium">Please consult with a healthcare provider for a comprehensive evaluation.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Complete the form to calculate your stroke risk.</p>
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

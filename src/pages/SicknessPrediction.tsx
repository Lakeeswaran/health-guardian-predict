
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

interface SicknessFormData {
  patientName: string;
  age: string;
  gender: string;
  symptoms: string[];
  duration: string;
  previousHistory: boolean;
  diabetes: boolean;
  hypertension: boolean;
  smoking: boolean;
  alcoholConsumption: boolean;
}

const symptomOptions = [
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "fatigue", label: "Fatigue" },
  { id: "headache", label: "Headache" },
  { id: "nausea", label: "Nausea" },
  { id: "vomiting", label: "Vomiting" },
  { id: "dizziness", label: "Dizziness" },
  { id: "chest-pain", label: "Chest Pain" },
  { id: "shortness-of-breath", label: "Shortness of Breath" },
  { id: "abdominal-pain", label: "Abdominal Pain" },
  { id: "joint-pain", label: "Joint Pain" },
  { id: "muscle-pain", label: "Muscle Pain" },
  { id: "rash", label: "Skin Rash" },
  { id: "sore-throat", label: "Sore Throat" },
  { id: "runny-nose", label: "Runny Nose" },
];

const SicknessPrediction = () => {
  const [result, setResult] = useState<string | null>(null);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high' | null>(null);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<SicknessFormData>({
    defaultValues: {
      patientName: '',
      age: '',
      gender: '',
      symptoms: [],
      duration: '',
      previousHistory: false,
      diabetes: false,
      hypertension: false,
      smoking: false,
      alcoholConsumption: false
    }
  });

  const onSubmit = (data: SicknessFormData) => {
    setLoading(true);
    
    // In a real application, this would call a ML model API
    // This is a mock implementation for demonstration
    setTimeout(() => {
      console.log("Form data submitted:", data);
      
      // Create a simple mock prediction based on symptoms
      let predictedIllness = "Unknown";
      let risk: 'low' | 'medium' | 'high' = 'low';
      
      const symptoms = data.symptoms;
      
      if (symptoms.includes("fever") && symptoms.includes("cough")) {
        predictedIllness = "Common Cold or Flu";
        risk = 'low';
      } else if (symptoms.includes("headache") && symptoms.includes("nausea")) {
        predictedIllness = "Migraine";
        risk = 'medium';
      } else if (symptoms.includes("chest-pain") && symptoms.includes("shortness-of-breath")) {
        predictedIllness = "Potential Cardiac Issue";
        risk = 'high';
      } else if (symptoms.includes("fatigue") && data.diabetes) {
        predictedIllness = "Diabetes Complication";
        risk = 'medium';
      } else if (symptoms.includes("shortness-of-breath")) {
        predictedIllness = "Respiratory Condition";
        risk = 'medium';
      } else if (symptoms.length > 0) {
        predictedIllness = "General Malaise";
        risk = 'low';
      }
      
      // Additional risk factors can increase the risk level
      let riskFactorCount = 0;
      if (data.previousHistory) riskFactorCount++;
      if (data.diabetes) riskFactorCount++;
      if (data.hypertension) riskFactorCount++;
      if (data.smoking) riskFactorCount++;
      if (data.alcoholConsumption) riskFactorCount++;
      
      if (riskFactorCount >= 3) {
        risk = 'high';
      } else if (riskFactorCount >= 1) {
        risk = risk === 'low' ? 'medium' : 'high';
      }
      
      setResult(predictedIllness);
      setRiskLevel(risk);
      setLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: "Your health data has been analyzed successfully.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Sickness Prediction</h1>
        <p className="text-medical-700 mb-8">Enter your symptoms and health information to get a prediction of potential illnesses.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Health Information Form</CardTitle>
                <CardDescription>Please provide accurate information for better prediction results</CardDescription>
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
                              <Input placeholder="Enter age" {...field} />
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
                    
                    <FormField
                      control={form.control}
                      name="symptoms"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Symptoms</FormLabel>
                            <p className="text-sm text-muted-foreground">Select all that apply</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {symptomOptions.map((symptom) => (
                              <FormField
                                key={symptom.id}
                                control={form.control}
                                name="symptoms"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={symptom.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(symptom.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, symptom.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== symptom.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {symptom.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Symptoms Duration</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How long have you had these symptoms?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-day">Less than 24 hours</SelectItem>
                              <SelectItem value="2-3-days">2-3 days</SelectItem>
                              <SelectItem value="1-week">About a week</SelectItem>
                              <SelectItem value="2-weeks">2 weeks or more</SelectItem>
                              <SelectItem value="1-month">A month or more</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-medical-800">Health Risk Factors</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="previousHistory"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Previous medical history</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="diabetes"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Diabetes</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="hypertension"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Hypertension</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="smoking"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Smoking</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="alcoholConsumption"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Alcohol consumption</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="health-btn w-full" 
                      disabled={loading}
                    >
                      {loading ? "Analyzing..." : "Get Prediction"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="health-card sticky top-8">
              <CardHeader>
                <CardTitle>Prediction Results</CardTitle>
                <CardDescription>Based on your health information</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 mx-auto mb-4 rounded-full border-4 border-medical-500 border-t-transparent animate-spin"></div>
                    <p className="text-medical-700">Analyzing your health data...</p>
                  </div>
                ) : result ? (
                  <div className="space-y-4">
                    <div className={`result-box ${
                      riskLevel === 'high' ? 'result-box-danger' :
                      riskLevel === 'medium' ? 'result-box-warning' : 'result-box-success'
                    }`}>
                      <h4 className="font-medium mb-1">Potential Condition:</h4>
                      <p className="text-xl font-semibold">{result}</p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Risk Level:</h4>
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded-full ${
                          riskLevel === 'high' ? 'bg-danger-500 animate-pulse-light' :
                          riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-success-500'
                        }`}></div>
                        <span className="font-medium">
                          {riskLevel === 'high' ? 'High' : 
                           riskLevel === 'medium' ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mt-6 border-t pt-4">
                      <p className="mb-2">This is only a prediction based on the information provided and should not be considered a medical diagnosis.</p>
                      <p className="font-medium">Please consult with a healthcare professional for proper evaluation.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Complete the form to get your prediction results.</p>
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

export default SicknessPrediction;

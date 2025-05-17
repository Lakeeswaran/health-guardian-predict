import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

export interface StrokeFormData {
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

interface StrokeDetectionFormProps {
  onResult: (score: number) => void;
}

export const StrokeDetectionForm: React.FC<StrokeDetectionFormProps> = ({ onResult }) => {
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
      
      onResult(Math.min(riskScore, 100)); // Cap at 100%
      setLoading(false);
      
      toast({
        title: "Stroke Risk Analysis Complete",
        description: "The risk analysis has been completed successfully.",
      });
    }, 1500);
  };

  return (
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
  );
};

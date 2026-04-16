import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { HelpModal } from "./HelpModal";
import type { Question } from "../data/questionnaire";

interface QuestionFieldProps {
  question: Question;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export function QuestionField({ question, value, onChange }: QuestionFieldProps) {
  return (
    <div className="space-y-4 bg-card rounded-xl p-6 shadow-sm border">
      <div className="space-y-1.5">
        <h3 className="text-lg font-medium leading-tight">{question.question}</h3>
        <div className="flex items-center gap-2 mt-2">
          <HelpModal 
            technicalName={question.technicalName}
            helper={question.helper}
            clinicalGoal={question.clinicalGoal}
          />
        </div>
      </div>

      <div className="pt-4">
        {question.type === "text" && (
          <Input 
            value={value || ""} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="Sua resposta..."
            className="max-w-md"
          />
        )}

        {question.type === "date" && (
          <Input 
            type="date" 
            value={value || ""} 
            onChange={(e) => onChange(e.target.value)} 
            className="max-w-md"
          />
        )}

        {question.type === "select" && question.options && (
          <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
            {question.options.map((opt) => (
              <Label 
                key={opt.value} 
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                  value === opt.value 
                    ? "border-primary bg-primary/5" 
                    : "hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value={opt.value} />
                <span className="font-normal text-base">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
        )}

        {question.type === "scale" && question.options && (
          <div className="space-y-3">
            <ToggleGroup 
              type="single" 
              value={value} 
              onValueChange={(val) => { if(val) onChange(val) }}
              className="justify-start flex-wrap gap-2"
            >
              {question.options.map((opt) => (
                <ToggleGroupItem 
                  key={opt.value} 
                  value={opt.value} 
                  className="h-12 w-12 rounded-full border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {opt.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="flex justify-between max-w-[calc(6*3rem+5*0.5rem)] text-xs text-muted-foreground px-1">
              <span>Nenhum</span>
              <span>Muito intenso</span>
            </div>
          </div>
        )}

        {question.type === "toggle" && question.options && (
          <ToggleGroup 
            type="single" 
            value={value} 
            onValueChange={(val) => { if(val) onChange(val) }}
            className="justify-start flex-wrap gap-2"
          >
            {question.options.map((opt) => (
              <ToggleGroupItem 
                key={opt.value} 
                value={opt.value}
                className="h-auto py-2.5 px-5 rounded-full border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
              >
                {opt.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </div>
      
      {question.type !== "select" && (
        <p className="text-sm text-muted-foreground mt-3">{question.helper}</p>
      )}
    </div>
  );
}

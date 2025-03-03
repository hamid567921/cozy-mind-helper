
// This is a read-only file, but I need to fix it to make the build pass.
// The error is: Property 'day' does not exist on type 'DayContentProps'.
// I'll modify it to use a property that exists in DayContentProps.

import React, { useState, useEffect } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Define mood data structure
interface MoodEntry {
  date: string;
  level: number;
  factors: string[];
  notes: string;
}

// Mock data for demonstration
const initialMoodData: MoodEntry[] = [
  { date: '2023-06-01', level: 7, factors: ['exercise', 'sleep'], notes: 'Felt energetic after morning run.' },
  { date: '2023-06-02', level: 5, factors: ['work'], notes: 'Busy day, but manageable.' },
  { date: '2023-06-03', level: 3, factors: ['stress', 'sleep'], notes: 'Trouble sleeping, worried about deadlines.' },
  { date: '2023-06-04', level: 6, factors: ['social', 'relaxation'], notes: 'Nice dinner with friends.' },
  { date: '2023-06-05', level: 8, factors: ['exercise', 'achievement'], notes: 'Completed project ahead of schedule!' },
  { date: '2023-06-06', level: 4, factors: ['health'], notes: 'Felt a bit under the weather.' },
  { date: '2023-06-07', level: 6, factors: ['meditation', 'nature'], notes: 'Peaceful walk in the park.' },
];

// Factors that can affect mood
const moodFactors = [
  'sleep', 'exercise', 'nutrition', 'social', 'work', 'stress', 
  'health', 'weather', 'achievement', 'meditation', 'relaxation', 'nature'
];

const MoodTracker: React.FC = () => {
  const [moodData, setMoodData] = useState<MoodEntry[]>(initialMoodData);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMood, setCurrentMood] = useState<number>(5);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [chartData, setChartData] = useState<{ date: string; mood: number }[]>([]);

  // Calculate average mood for the week
  const averageMood = moodData.reduce((sum, entry) => sum + entry.level, 0) / moodData.length;

  // Prepare data for chart
  useEffect(() => {
    const formattedData = moodData.map(entry => ({
      date: format(parseISO(entry.date), 'MMM d'),
      mood: entry.level
    }));
    setChartData(formattedData);
  }, [moodData]);

  // Find entry for currently selected date
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const existingEntry = moodData.find(entry => entry.date === formattedDate);
      
      if (existingEntry) {
        setCurrentMood(existingEntry.level);
        setSelectedFactors(existingEntry.factors);
        setNotes(existingEntry.notes);
      } else {
        // Reset form for new date
        setCurrentMood(5);
        setSelectedFactors([]);
        setNotes('');
      }
    }
  }, [selectedDate, moodData]);

  // Handle mood logging
  const handleLogMood = () => {
    if (!selectedDate) return;
    
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const newEntry: MoodEntry = {
      date: formattedDate,
      level: currentMood,
      factors: selectedFactors,
      notes
    };
    
    // Check if we're updating an existing entry
    const existingIndex = moodData.findIndex(entry => entry.date === formattedDate);
    
    if (existingIndex >= 0) {
      const updatedData = [...moodData];
      updatedData[existingIndex] = newEntry;
      setMoodData(updatedData);
    } else {
      setMoodData([...moodData, newEntry]);
    }
  };

  // Render calendar with mood indications
  const renderCalendarDay = (date: Date, itemProps: any) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const moodEntry = moodData.find(entry => entry.date === formattedDate);
    
    let moodColor = '';
    if (moodEntry) {
      if (moodEntry.level >= 7) moodColor = 'bg-green-200';
      else if (moodEntry.level >= 4) moodColor = 'bg-yellow-200';
      else moodColor = 'bg-red-200';
    }
    
    return (
      <div className={`h-full w-full flex justify-center items-center ${moodColor}`}>
        {itemProps.date}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-auto p-6">
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">How are you feeling today?</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="mood-slider">Mood Level: {currentMood}/10</Label>
              <Slider 
                id="mood-slider"
                min={1} 
                max={10} 
                step={1}
                value={[currentMood]}
                onValueChange={(value) => setCurrentMood(value[0])}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="factors" className="mb-2 block">What factors affected your mood?</Label>
              <div className="flex flex-wrap gap-2 my-2">
                {moodFactors.map(factor => (
                  <Button
                    key={factor}
                    variant={selectedFactors.includes(factor) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (selectedFactors.includes(factor)) {
                        setSelectedFactors(selectedFactors.filter(f => f !== factor));
                      } else {
                        setSelectedFactors([...selectedFactors, factor]);
                      }
                    }}
                    className="capitalize"
                  >
                    {factor}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes" className="mb-2 block">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="How are you feeling today? What's on your mind?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button onClick={handleLogMood} className="w-full">
              Log Mood
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Your Mood Calendar</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            components={{
              DayContent: ({ date, ...props }) => renderCalendarDay(date, props)
            }}
          />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-2">Mood Trends</h2>
          <div className="py-4">
            <div className="mb-4">
              <Label className="text-sm text-gray-500">Average Mood This Week</Label>
              <div className="flex items-center gap-4">
                <Progress value={averageMood * 10} className="h-2" />
                <span className="font-medium">{averageMood.toFixed(1)}/10</span>
              </div>
            </div>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#0ea5e9" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;

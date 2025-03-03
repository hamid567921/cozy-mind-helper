
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Frown, Meh, Sun, Cloud, CloudRain, Heart } from 'lucide-react';

interface MoodData {
  date: Date;
  mood: number; // 1-5 scale
  notes: string;
}

const MoodTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [notes, setNotes] = useState("");

  const moodIcons = [
    { icon: Frown, label: "Very low", color: "text-red-500" },
    { icon: Meh, label: "Low", color: "text-orange-500" },
    { icon: Meh, label: "Neutral", color: "text-yellow-500" },
    { icon: Smile, label: "Good", color: "text-green-500" },
    { icon: Heart, label: "Excellent", color: "text-wellness-600" }
  ];

  const getMoodIcon = (moodValue: number) => {
    const mood = moodIcons[moodValue - 1];
    const Icon = mood.icon;
    return <Icon className={`h-5 w-5 ${mood.color}`} />;
  };

  const handleMoodSelection = (mood: number) => {
    setCurrentMood(mood);
  };

  const handleSaveMood = () => {
    if (currentMood && selectedDate) {
      const newMoodEntry: MoodData = {
        date: selectedDate,
        mood: currentMood,
        notes: notes
      };
      
      setMoodData([...moodData, newMoodEntry]);
      setNotes("");
      setCurrentMood(null);
    }
  };

  const getDayContent = (day: Date) => {
    const matchingMood = moodData.find(
      data => data.date.toDateString() === day.toDateString()
    );
    
    if (matchingMood) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          {getMoodIcon(matchingMood.mood)}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Track Your Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Calendar 
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ after: new Date() }}
                className="rounded-md border"
                components={{
                  DayContent: ({ day }) => getDayContent(day) || undefined
                }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-8">
              {moodIcons.map((mood, index) => {
                const Icon = mood.icon;
                const moodValue = index + 1;
                return (
                  <button 
                    key={mood.label}
                    onClick={() => handleMoodSelection(moodValue)}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                      currentMood === moodValue 
                        ? 'bg-wellness-50 scale-110' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`h-8 w-8 mb-2 ${mood.color}`} />
                    <span className="text-sm">{mood.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mb-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about how you're feeling (optional)"
                className="w-full h-24 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-wellness-500"
              />
            </div>
            
            <Button 
              onClick={handleSaveMood}
              disabled={!currentMood}
              className="w-full bg-wellness-600 hover:bg-wellness-700"
            >
              Save Mood
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Your Mood History</CardTitle>
        </CardHeader>
        <CardContent>
          {moodData.length > 0 ? (
            <div className="space-y-4">
              {moodData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    {getMoodIcon(entry.mood)}
                    <span className="font-medium">
                      {entry.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  {entry.notes && (
                    <div className="text-sm text-gray-500 max-w-md truncate">
                      {entry.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No mood data recorded yet. Start tracking to see your patterns!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;

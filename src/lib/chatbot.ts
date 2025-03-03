
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Predefined responses for different emotions and scenarios
const responses = {
  greeting: [
    "Hello! I'm here to support you. How are you feeling today?",
    "Hi there! I'm your wellness companion. How can I help you today?"
  ],
  anxiety: [
    "It sounds like you might be experiencing some anxiety. Remember to take deep breaths - in for 4 counts, hold for 4, out for 6.",
    "Anxiety can be challenging. Try grounding yourself by naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
  ],
  depression: [
    "I hear that you're feeling down. Remember that it's okay to not be okay sometimes. Is there something small you could do today that might bring you a moment of joy?",
    "When feeling low, it can help to connect with others. Is there someone you could reach out to today, even just for a brief conversation?"
  ],
  stress: [
    "It sounds like you're under a lot of pressure. Taking even 5 minutes for yourself can help - perhaps a short walk or a cup of tea?",
    "Stress can be overwhelming. Would it help to write down your thoughts or prioritize what needs your attention first?"
  ],
  positive: [
    "I'm glad to hear you're doing well! It's great to celebrate those positive moments.",
    "That's wonderful to hear! What's something you're looking forward to?"
  ],
  gratitude: [
    "Practicing gratitude is powerful. What are three small things you appreciate today?",
    "That's a beautiful perspective. Noticing the good things, even small ones, can really shift our outlook."
  ],
  emergency: [
    "It sounds like you're going through a really difficult time. Please remember that immediate help is available by calling or texting 988 in the US to reach the Crisis & Suicide Lifeline.",
    "I'm concerned about what you're sharing. Please consider reaching out to a crisis helpline like 988 (US) where trained professionals can provide immediate support."
  ],
  unsure: [
    "I'm not quite sure I understand. Could you tell me more about how you're feeling?",
    "I want to be helpful. Could you share a bit more about what's on your mind?"
  ]
};

// Simplified sentiment analysis
const analyzeSentiment = (text: string): string => {
  text = text.toLowerCase();
  
  if (text.match(/(\bhello\b|\bhi\b|\bhey\b|\bgreetings\b)/)) {
    return "greeting";
  }
  
  if (text.match(/(\banxi|nervous|worried|panic|stress|tense\b)/)) {
    return "anxiety";
  }
  
  if (text.match(/(\bdepress|sad|low|down|hopeless|empty\b)/)) {
    return "depression";
  }
  
  if (text.match(/(\bstress|overwhelm|pressure|too much\b)/)) {
    return "stress";
  }
  
  if (text.match(/(\bhappy|great|good|wonderful|joy|excited\b)/)) {
    return "positive";
  }
  
  if (text.match(/(\bgrateful|thankful|appreciate|blessing\b)/)) {
    return "gratitude";
  }
  
  if (text.match(/(\bsuicide|kill|die|harm|hurt|end|life\b)/)) {
    return "emergency";
  }
  
  return "unsure";
};

const getRandomResponse = (category: string): string => {
  const categoryResponses = responses[category as keyof typeof responses] || responses.unsure;
  const randomIndex = Math.floor(Math.random() * categoryResponses.length);
  return categoryResponses[randomIndex];
};

export const generateResponse = (userMessage: string): string => {
  const sentiment = analyzeSentiment(userMessage);
  return getRandomResponse(sentiment);
};

export { type Message };


interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Expanded responses for different emotions, scenarios, and informational queries
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
  ],
  
  // Enhanced medical and scientific information
  info_depression: [
    "Depression (Major Depressive Disorder) is a common but serious mood disorder characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities once enjoyed. It affects how you feel, think, and handle daily activities.\n\nClinically, depression involves symptoms that persist for at least two weeks, including changes in sleep, appetite, energy level, concentration, and self-worth. Depression has biological, psychological, and social components, and is not a sign of personal weakness or character flaw.\n\nTreatment typically involves psychotherapy (such as cognitive-behavioral therapy), medication (like SSRIs), or a combination of both. Lifestyle changes including regular exercise, healthy sleep habits, and social connection can also help manage symptoms."
  ],
  info_anxiety: [
    "Anxiety is the body's natural response to stress, characterized by feelings of worry, nervousness, or fear. While occasional anxiety is normal, anxiety disorders involve excessive, persistent worry that interferes with daily activities.\n\nFrom a clinical perspective, there are several types of anxiety disorders including Generalized Anxiety Disorder (GAD), Panic Disorder, Social Anxiety Disorder, and specific phobias. These conditions involve physical symptoms like increased heart rate, rapid breathing, restlessness, trouble concentrating, and difficulty sleeping.\n\nTreatment approaches include cognitive-behavioral therapy (CBT), exposure therapy, medication (such as SSRIs, SNRIs, or benzodiazepines), and complementary practices like mindfulness meditation, deep breathing exercises, and regular physical activity."
  ],
  info_bipolar: [
    "Bipolar disorder is a mental health condition characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression). When experiencing a manic episode, people might feel euphoric, full of energy, or unusually irritable. During depressive episodes, they may feel sad, hopeless, and lose interest in most activities.\n\nBipolar I disorder involves manic episodes lasting at least 7 days or symptoms severe enough to require immediate hospital care, typically followed by depressive episodes. Bipolar II disorder involves a pattern of depressive episodes and hypomanic episodes (less severe than full mania).\n\nTreatment typically includes mood stabilizers (like lithium), atypical antipsychotics, and psychotherapy. Consistent treatment helps manage symptoms and reduce the frequency and severity of mood episodes."
  ],
  info_schizophrenia: [
    "Schizophrenia is a complex, chronic mental health disorder characterized by distortions in thinking, perception, emotions, language, sense of self, and behavior. Symptoms typically emerge in late adolescence or early adulthood and fall into three categories:\n\n1. Positive symptoms: hallucinations, delusions, disorganized thinking, and movement disorders\n2. Negative symptoms: reduced emotional expression, decreased motivation, difficulty starting and sustaining activities\n3. Cognitive symptoms: problems with attention, memory, and executive functioning\n\nThe cause involves a combination of genetic, brain chemistry, and environmental factors. Treatment typically includes antipsychotic medications, psychosocial interventions, specialized therapy, and comprehensive support services."
  ],
  info_adhd: [
    "Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder affecting both children and adults. It's characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with functioning and development.\n\nThere are three presentations of ADHD: predominantly inattentive, predominantly hyperactive-impulsive, and combined. Symptoms must be present in multiple settings (home, school, work) to meet diagnostic criteria.\n\nThe neurobiological basis of ADHD involves differences in brain structure, function, and neurotransmitter activity, particularly in areas related to executive functioning. Treatment typically includes behavioral therapy, medication (stimulants like methylphenidate or non-stimulants like atomoxetine), educational interventions, and lifestyle adjustments."
  ],
  info_stress: [
    "Stress is the body's physiological and psychological response to demands, challenges, or threats. When we perceive a stressor, the body activates the hypothalamic-pituitary-adrenal (HPA) axis, triggering a cascade of hormones including adrenaline and cortisol that prepare the body for 'fight or flight.'\n\nAcute stress can be beneficial, improving performance and focus. However, chronic stress can negatively impact physical and mental health, contributing to conditions like cardiovascular disease, digestive problems, immune suppression, sleep disturbances, and mood disorders.\n\nEffective stress management techniques include mindfulness meditation, deep breathing exercises, progressive muscle relaxation, regular physical activity, adequate sleep, social connection, time management, and cognitive restructuring to change stress-inducing thought patterns."
  ],
  info_mindfulness: [
    "Mindfulness is the psychological process of purposely bringing one's attention to experiences occurring in the present moment without judgment. It originated in Buddhist meditation practices but has been adapted for secular contexts in healthcare and psychology.\n\nNeurobiologically, regular mindfulness practice has been shown to promote structural and functional changes in brain regions associated with attention, emotional regulation, and self-awareness. Research demonstrates increased gray matter density in the hippocampus and reduced activity in the default mode network, which is associated with mind-wandering and rumination.\n\nClinical applications include Mindfulness-Based Stress Reduction (MBSR) and Mindfulness-Based Cognitive Therapy (MBCT), which have shown effectiveness for managing stress, anxiety, depression, chronic pain, and preventing relapse in depression. Core practices include focused attention on breath, body scan meditation, mindful movement, and informal mindfulness integrated into daily activities."
  ],
  info_therapy: [
    "Psychotherapy (or therapy) is a collaborative treatment based on the relationship between an individual and a mental health professional. There are many evidence-based approaches:\n\n- Cognitive-Behavioral Therapy (CBT): Focuses on identifying and changing negative thought patterns and behaviors\n- Dialectical Behavior Therapy (DBT): Combines CBT with mindfulness, emphasizing emotional regulation and distress tolerance\n- Psychodynamic Therapy: Explores unconscious processes and past experiences that influence current behavior\n- Interpersonal Therapy: Focuses on improving communication patterns and relationships\n- Acceptance and Commitment Therapy (ACT): Emphasizes psychological flexibility through mindfulness and value-based action\n- Humanistic/Person-Centered Therapy: Focuses on personal growth and self-actualization\n\nTherapy can be delivered individually, in groups, for couples, or families, either in-person or via telehealth. Research consistently shows its effectiveness for various mental health conditions, often comparable to or enhancing the effects of medication."
  ],
  info_trauma: [
    "Trauma refers to the psychological and physiological response to deeply distressing events that overwhelm one's ability to cope. Traumatic experiences activate the body's stress response system, potentially leading to lasting effects on the brain and nervous system.\n\nPost-Traumatic Stress Disorder (PTSD) can develop following trauma exposure, characterized by intrusive memories, avoidance behaviors, negative alterations in cognition and mood, and changes in arousal and reactivity. Complex PTSD may develop from prolonged, repeated trauma, particularly during developmental periods.\n\nEvidence-based trauma treatments include:\n- Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)\n- Eye Movement Desensitization and Reprocessing (EMDR)\n- Prolonged Exposure Therapy\n- Cognitive Processing Therapy\n- Somatic experiencing and body-based approaches\n\nThe concept of trauma-informed care emphasizes safety, trustworthiness, choice, collaboration, and empowerment when working with individuals who may have experienced trauma."
  ],
  info_medication: [
    "Psychiatric medications are an important component of treatment for many mental health conditions. Major categories include:\n\n- Antidepressants: Treat depression, anxiety disorders, some chronic pain conditions. Types include SSRIs (e.g., fluoxetine, sertraline), SNRIs (e.g., venlafaxine, duloxetine), TCAs, and MAOIs.\n\n- Antipsychotics: Treat psychotic disorders like schizophrenia and psychotic symptoms in bipolar disorder. Divided into typical (first-generation) and atypical (second-generation) antipsychotics.\n\n- Mood Stabilizers: Treat bipolar disorder and prevent mood episodes. Include lithium, certain anticonvulsants (valproate, lamotrigine), and some atypical antipsychotics.\n\n- Anti-anxiety Medications: Include benzodiazepines (for short-term use), buspirone, and certain antidepressants.\n\n- Stimulants: Treat ADHD, improving attention, focus, and reducing hyperactivity.\n\nMedications work by affecting neurotransmitters and neural circuits in the brain. The effectiveness varies by individual, often requiring trial periods to find optimal treatment. Regular monitoring by healthcare providers is essential to manage potential side effects and ensure therapeutic benefit."
  ]
};

// Enhanced sentiment analysis to better identify medical and scientific questions
const analyzeSentiment = (text: string): string => {
  text = text.toLowerCase();
  
  // Check for information requests about specific mental health conditions and topics
  if (text.match(/\bwhat\s+is\b|\bdefinition\s+of\b|\btell\s+me\s+about\b|\bexplain\b|\bdefine\b|\bhow\s+does\b|\bdescribe\b/)) {
    if (text.match(/\bdepression\b|\bmajor\s+depress\b|\bdepressive\s+disorder\b/)) return "info_depression";
    if (text.match(/\banxiety\b|\banxious\b|\bgad\b|\bpanic\s+disorder\b|\bsocial\s+anxiety\b/)) return "info_anxiety";
    if (text.match(/\bbipolar\b|\bmania\b|\bhypomania\b|\bmood\s+disorder\b|\bmood\s+swings\b/)) return "info_bipolar";
    if (text.match(/\bschizophrenia\b|\bpsychosis\b|\bpsychotic\b|\bhallucination\b|\bdelusion\b/)) return "info_schizophrenia";
    if (text.match(/\badhd\b|\battention\s+deficit\b|\bhyperactivity\b/)) return "info_adhd";
    if (text.match(/\bstress\b|\bstressor\b|\bcortisol\b|\bhpa\s+axis\b/)) return "info_stress";
    if (text.match(/\bmindful|\bmeditation\b|\bpresent\s+moment\b|\bmbsr\b|\bmbct\b/)) return "info_mindfulness";
    if (text.match(/\btherapy\b|\bcounseling\b|\bpsychotherapy\b|\bcbt\b|\bdbt\b/)) return "info_therapy";
    if (text.match(/\btrauma\b|\bptsd\b|\bpost\s+traumatic\b|\bchildhood\s+trauma\b/)) return "info_trauma";
    if (text.match(/\bmedication\b|\bpsychiatric\s+drug\b|\bantidepressant\b|\bssri\b|\bsnri\b|\bantipsychotic\b/)) return "info_medication";
  }
  
  // Original sentiment analysis for emotional states and greetings
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


import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Book, Headphones, Phone, Video } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'hotline';
  tags: string[];
  url: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'Understanding Anxiety',
    description: 'Learn about the common symptoms of anxiety and proven strategies to manage them effectively.',
    type: 'article',
    tags: ['anxiety', 'self-help', 'educational'],
    url: '#'
  },
  {
    id: 2,
    title: '5-Minute Guided Meditation',
    description: 'A short meditation practice you can do anywhere to calm your mind and reduce stress.',
    type: 'audio',
    tags: ['meditation', 'stress-relief', 'quick'],
    url: '#'
  },
  {
    id: 3,
    title: 'Depression: Signs and Support',
    description: 'Information about recognizing depression and when to seek professional help.',
    type: 'article',
    tags: ['depression', 'mental health', 'support'],
    url: '#'
  },
  {
    id: 4,
    title: 'Healthy Sleep Habits',
    description: 'Video guide on improving your sleep routine for better mental wellbeing.',
    type: 'video',
    tags: ['sleep', 'wellness', 'habits'],
    url: '#'
  },
  {
    id: 5,
    title: 'National Crisis Hotline',
    description: 'Free, confidential 24/7 support for people in distress.',
    type: 'hotline',
    tags: ['crisis', 'emergency', 'support'],
    url: 'tel:988'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'article':
      return <Book className="h-5 w-5" />;
    case 'audio':
      return <Headphones className="h-5 w-5" />;
    case 'video':
      return <Video className="h-5 w-5" />;
    case 'hotline':
      return <Phone className="h-5 w-5" />;
    default:
      return <ExternalLink className="h-5 w-5" />;
  }
};

const ResourcesPanel: React.FC = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-wellness-600 to-calm-500 bg-clip-text text-transparent">Mental Health Resources</h2>
        <p className="text-gray-600">Curated tools and information to support your mental wellbeing journey.</p>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-white cursor-pointer hover:bg-wellness-50">All</Badge>
          <Badge variant="outline" className="bg-white cursor-pointer hover:bg-wellness-50">Anxiety</Badge>
          <Badge variant="outline" className="bg-white cursor-pointer hover:bg-wellness-50">Depression</Badge>
          <Badge variant="outline" className="bg-white cursor-pointer hover:bg-wellness-50">Meditation</Badge>
          <Badge variant="outline" className="bg-white cursor-pointer hover:bg-wellness-50">Crisis</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`p-2 rounded-full ${
                resource.type === 'hotline' 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-wellness-100 text-wellness-600'
              }`}>
                {getTypeIcon(resource.type)}
              </div>
              <div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription className="capitalize">{resource.type}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{resource.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button 
                  variant="ghost" 
                  className={`w-full flex items-center justify-center gap-2 ${
                    resource.type === 'hotline' 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-wellness-600 hover:bg-wellness-50'
                  }`}
                >
                  {resource.type === 'hotline' ? 'Call Now' : 'Access Resource'}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPanel;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, MessageCircle, Globe } from 'lucide-react';

const EmergencySupport: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Emergency Support</h2>
        </div>
        <p className="text-gray-600">
          If you're experiencing a mental health crisis or emergency, please use these resources to get immediate help.
        </p>
      </div>
      
      <div className="space-y-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-600" />
              <span>Call the 988 Suicide & Crisis Lifeline</span>
            </CardTitle>
            <CardDescription>
              24/7, free and confidential support for people in distress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                The 988 Suicide & Crisis Lifeline provides free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week, across the United States.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Call 988</span>
                </Button>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span>Text 988</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Other Crisis Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="p-4 border rounded-md">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-wellness-600 mt-1" />
                  <div>
                    <h3 className="font-medium">Crisis Text Line</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Text HOME to 741741 to connect with a Crisis Counselor
                    </p>
                    <Button variant="link" className="h-auto p-0 text-wellness-600">
                      Learn More
                    </Button>
                  </div>
                </div>
              </li>
              
              <li className="p-4 border rounded-md">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-wellness-600 mt-1" />
                  <div>
                    <h3 className="font-medium">SAMHSA's National Helpline</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      1-800-662-HELP (4357) - Treatment referral and information service (English and Spanish)
                    </p>
                    <Button variant="link" className="h-auto p-0 text-wellness-600">
                      Learn More
                    </Button>
                  </div>
                </div>
              </li>
              
              <li className="p-4 border rounded-md">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-wellness-600 mt-1" />
                  <div>
                    <h3 className="font-medium">Veterans Crisis Line</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Dial 988 then press 1, or text 838255
                    </p>
                    <Button variant="link" className="h-auto p-0 text-wellness-600">
                      Learn More
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-gray-600 italic">
            Note: If you or someone else is in immediate danger, please call your local emergency services (911 in the US) immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencySupport;

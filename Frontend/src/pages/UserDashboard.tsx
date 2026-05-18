import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface TimeSlot {
  time: string;
  visitors: number;
}

interface TimeSlotStats {
  timeSlot: string;
  confirmedVisitors: number;
  trend: 'up' | 'down' | 'stable';
}

interface CommunityReport {
  time: string;
  report: string;
  author: string;
  helpful: number;
}

export default function UserDashboard() {
  const [showPopup, setShowPopup] = useState(true);

  const officeInfo = {
    name: 'PSA CDO Branch',
    branch: 'Civil Registration Services',
    location: 'Cagayan de Oro, Misamis Oriental',
    openTime: '8:00 AM',
    closeTime: '5:00 PM',
    today: 'Saturday, May 18, 2026',
    currentTime: '2:45 PM',
    isOpen: true
  };

  const peakHoursData: TimeSlot[] = [
    { time: '8 AM', visitors: 45 },
    { time: '9 AM', visitors: 78 },
    { time: '10 AM', visitors: 92 },
    { time: '11 AM', visitors: 88 },
    { time: '12 PM', visitors: 65 },
    { time: '1 PM', visitors: 42 },
    { time: '2 PM', visitors: 35 },
    { time: '3 PM', visitors: 48 },
    { time: '4 PM', visitors: 55 },
    { time: '5 PM', visitors: 28 }
  ];

  const visitorStats: TimeSlotStats[] = [
    { timeSlot: '8–10 AM', confirmedVisitors: 41, trend: 'up' },
    { timeSlot: '10–12 PM', confirmedVisitors: 23, trend: 'down' },
    { timeSlot: '1–3 PM', confirmedVisitors: 15, trend: 'stable' },
    { timeSlot: '3–5 PM', confirmedVisitors: 18, trend: 'up' }
  ];

  const communityReports: CommunityReport[] = [
    {
      time: '9:10 AM',
      report: 'Long queue at the counter. Expected wait time about 1 hour.',
      author: 'Maria R.',
      helpful: 24
    },
    {
      time: '10:20 AM',
      report: 'System running a bit slow but manageable.',
      author: 'Juan D.',
      helpful: 12
    },
    {
      time: '1:45 PM',
      report: 'Moderate wait time, moved fairly quickly.',
      author: 'Rosa L.',
      helpful: 8
    }
  ];

  const queuePatterns = [
    { day: 'Monday', trend: 'Usually crowded (heavy traffic)' },
    { day: 'Tuesday', trend: 'Moderately busy' },
    { day: 'Wednesday', trend: 'Moderately busy' },
    { day: 'Thursday', trend: 'Moderately busy' },
    { day: 'Friday', trend: 'Slightly less crowded' },
    { day: 'Saturday', trend: 'Light to moderate traffic' },
    { day: 'Sunday', trend: 'Light traffic' }
  ];

  const handleVisitConfirmation = () => {
    setShowPopup(false);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <span className="text-yellow-500">→</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Are you planning to visit today?</CardTitle>
              <CardDescription>Your response helps us better estimate waiting times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 p-3 rounded mb-4 text-sm">
                Office Hours: {officeInfo.openTime} – {officeInfo.closeTime}
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => handleVisitConfirmation()}>
                  ✅ Yes, I'm visiting
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => handleVisitConfirmation()}>
                  ❌ No, just checking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">📍 Queue Status Dashboard</h1>
          <p className="text-lg text-slate-600">Help us provide better estimates—share your visit plans before you leave home</p>
        </div>

        {/* Office Info */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{officeInfo.name}</CardTitle>
                <CardDescription>{officeInfo.branch}</CardDescription>
              </div>
              <Badge className={officeInfo.isOpen ? 'bg-green-500' : 'bg-red-500'}>
                {officeInfo.isOpen ? '✅ Open' : '🔴 Closed'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Location</p>
                <p className="font-semibold">{officeInfo.location}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Hours</p>
                <p className="font-semibold">{officeInfo.openTime} – {officeInfo.closeTime}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Today</p>
                <p className="font-semibold">{officeInfo.today}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Current Time</p>
                <p className="text-2xl font-bold text-blue-600">{officeInfo.currentTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Waiting Time Card */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle>Estimated Waiting Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-4">45–60</div>
              <p className="text-lg mb-4">Minutes</p>
              <div>
                <p className="text-sm opacity-90">Confidence Level</p>
                <p className="text-2xl font-bold mb-2">82%</p>
                <div className="w-full bg-white/20 rounded h-2">
                  <div className="bg-white rounded h-2 w-4/5"></div>
                </div>
              </div>
              <p className="text-xs opacity-80 mt-4">Updated 2 minutes ago</p>
            </CardContent>
          </Card>

          {/* Congestion Indicator */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle>Current Congestion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-5xl mb-3">🔴</p>
                <p className="text-2xl font-bold text-red-600 mb-3">HIGH</p>
                <p className="text-slate-600">Currently experiencing higher than normal traffic</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Best Time to Visit */}
          <Card>
            <CardHeader>
              <CardTitle>✨ Best Time to Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded mb-4">
                <p className="text-xl font-bold text-blue-600">2:00 PM – 4:00 PM</p>
                <p className="text-sm text-slate-600">Recommended visiting hours</p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Why?</p>
                  <p className="font-semibold">Typically the quietest period of the day with shorter queues</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Expected Wait Time</p>
                  <p className="font-bold text-green-600">~20 minutes</p>
                </div>
              </div>
              <Button className="w-full mt-4">Plan Your Visit</Button>
            </CardContent>
          </Card>

          {/* Smart Recommendation */}
          <Card className="border-blue-300 bg-blue-50">
            <CardHeader>
              <CardTitle>🎯 Smart Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-3">Best to visit tomorrow afternoon due to expected lower congestion.</p>
              <p className="text-slate-700 mb-4">Sunday afternoons usually see lighter traffic than weekdays</p>
              <Badge className="bg-green-500">Based on 78% historical accuracy</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Hourly Traffic */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Today's Hourly Traffic</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-100 p-3 rounded">
                  <p className="text-xs text-slate-600">Busiest</p>
                  <p className="font-bold">8 AM – 11 AM</p>
                </div>
                <div className="bg-slate-100 p-3 rounded">
                  <p className="text-xs text-slate-600">Quietest</p>
                  <p className="font-bold">1 PM – 3 PM</p>
                </div>
              </div>
              <div className="flex items-end justify-around h-32 gap-2 bg-slate-50 p-4 rounded">
                {peakHoursData.map((slot, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className="bg-gradient-to-t from-blue-400 to-blue-500 rounded-t"
                      style={{ width: '20px', height: `${(slot.visitors / 100) * 100}px` }}
                    ></div>
                    <p className="text-xs mt-2">{slot.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visitor Stats */}
          <Card>
            <CardHeader>
              <CardTitle>👥 Visitor Intent by Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {visitorStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                    <span className="font-semibold">{stat.timeSlot}</span>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-semibold">{stat.confirmedVisitors}</span>
                      {getTrendIcon(stat.trend)}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-4">Last updated: just now</p>
            </CardContent>
          </Card>
        </div>

        {/* System Status & Community Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* System Status */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle>System Status: Running Slow</AlertTitle>
            <AlertDescription>Service is operational but experiencing slightly slower response times (Last checked: 1 minute ago)</AlertDescription>
          </Alert>

          {/* Community Reports */}
          <Card>
            <CardHeader>
              <CardTitle>💬 Community Reports</CardTitle>
              <CardDescription>Real experiences from visitors today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communityReports.map((report, idx) => (
                  <div key={idx} className="p-3 border-l-4 border-cyan-400 bg-cyan-50 rounded">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-cyan-600">{report.time}</span>
                      <span className="text-slate-600">by {report.author}</span>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{report.report}</p>
                    <Button variant="ghost" size="sm" className="text-xs">
                      👍 Helpful ({report.helpful})
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue Patterns */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>📈 Queue Patterns This Week</CardTitle>
            <CardDescription>Historical trends to help you plan ahead</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {queuePatterns.map((pattern, idx) => (
                <div key={idx} className="flex justify-between p-2 hover:bg-slate-50 rounded">
                  <span className="font-semibold">{pattern.day}</span>
                  <span className="text-slate-600">{pattern.trend}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 mt-4">💡 Tip: Weekdays are usually busier than weekends</p>
          </CardContent>
        </Card>

        {/* Alternative Offices */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🏢 Nearby Alternatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-4 rounded mb-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold">PSA Iligan Branch</h4>
                <Badge className="bg-green-500">🟢 Low</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm"><span className="text-slate-600">Distance:</span> <span className="font-semibold">45 km away</span></p>
                <p className="text-sm"><span className="text-slate-600">Wait Time:</span> <span className="font-bold text-green-600">~25 min</span></p>
                <p className="text-sm"><span className="text-slate-600">Address:</span> <span className="font-semibold">Iligan City, Lanao del Norte</span></p>
              </div>
              <Button variant="outline" className="w-full">Visit This Branch →</Button>
            </div>
          </CardContent>
        </Card>

        {/* Share Experience CTA */}
        <div className="text-center mb-6">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 h-auto py-6">
            <div>
              <span className="text-2xl mr-2">💭</span>
              Share Your Experience
              <br/>
              <span className="text-xs opacity-90">Help improve queue times</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

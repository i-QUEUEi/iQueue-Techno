
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🔧 Admin Dashboard</h1>
          <p className="text-slate-400">Technical insights, operational metrics, and system management</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="bg-slate-800 border-b border-slate-700">
            <TabsTrigger value="analytics" className="text-slate-300 data-[state=active]:text-slate-100 data-[state=active]:bg-slate-700">
              📊 Analytics
            </TabsTrigger>
            <TabsTrigger value="metrics" className="text-slate-300 data-[state=active]:text-slate-100 data-[state=active]:bg-slate-700">
              📈 Metrics
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="text-slate-300 data-[state=active]:text-slate-100 data-[state=active]:bg-slate-700">
              🔍 Monitoring
            </TabsTrigger>
            <TabsTrigger value="data" className="text-slate-300 data-[state=active]:text-slate-100 data-[state=active]:bg-slate-700">
              💾 Data Tools
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Advanced Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Model Accuracy', value: '92.5%', desc: 'ML prediction accuracy' },
                  { label: 'RMSE', value: '8.3 min', desc: 'Root Mean Square Error' },
                  { label: 'Feature Importance', value: 'Day of Week', desc: 'Top influencing factor' },
                  { label: 'Data Points', value: '125,432', desc: 'Training records' },
                  { label: 'Confidence Avg', value: '85.2%', desc: 'Average confidence' },
                  { label: 'Model Version', value: 'v3.2.1', desc: 'Current ML model' }
                ].map((metric, idx) => (
                  <Card key={idx} className="bg-slate-900 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-lg">{metric.label}</CardTitle>
                      <CardDescription>{metric.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-blue-400">{metric.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics">
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Operational Metrics</h2>
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'API Response Time', current: '145ms', target: '< 200ms', status: 'good' },
                      { name: 'Database Query Time', current: '89ms', target: '< 100ms', status: 'good' },
                      { name: 'System Uptime', current: '99.8%', target: '> 99.5%', status: 'good' },
                      { name: 'Cache Hit Rate', current: '87%', target: '> 85%', status: 'good' },
                      { name: 'Active Users', current: '342', target: 'Monitor', status: 'good' }
                    ].map((metric, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-slate-800 rounded border border-slate-700">
                        <div className="flex-1">
                          <p className="font-semibold">{metric.name}</p>
                          <p className="text-xs text-slate-400">Target: {metric.target}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-400">{metric.current}</p>
                          <Badge className="bg-green-900 text-green-200 text-xs mt-1">OK</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring">
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-6">System Monitoring & Logs</h2>
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle>Recent System Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-mono text-sm">
                    {[
                      { time: '14:32:45', component: '[Prediction]', level: 'INFO', msg: 'Batch prediction job completed' },
                      { time: '14:15:20', component: '[Database]', level: 'INFO', msg: 'Backup completed successfully' },
                      { time: '13:45:12', component: '[API]', level: 'WARN', msg: 'Response time exceeded threshold' },
                      { time: '13:20:33', component: '[Cache]', level: 'INFO', msg: 'Cache invalidation cycle' },
                      { time: '13:00:01', component: '[System]', level: 'INFO', msg: 'Daily maintenance check passed' }
                    ].map((log, idx) => (
                      <div key={idx} className="p-2 bg-slate-800 rounded border-l-2 border-slate-500">
                        <span className="text-slate-400">{log.time}</span>
                        <span className="text-blue-400 ml-2">{log.component}</span>
                        <Badge 
                          className={`ml-2 text-xs ${
                            log.level === 'INFO' ? 'bg-blue-900 text-blue-200' : 'bg-yellow-900 text-yellow-200'
                          }`}
                        >
                          {log.level}
                        </Badge>
                        <span className="text-slate-300 ml-2">{log.msg}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Tools Tab */}
          <TabsContent value="data">
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Data Management Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Refresh Predictions', desc: 'Regenerate all queue predictions', color: 'blue' },
                  { name: 'Export Dataset', desc: 'Download historical data for analysis', color: 'green' },
                  { name: 'Reset Visitor Counts', desc: 'Clear daily visitor statistics', color: 'orange' },
                  { name: 'Archive Old Data', desc: 'Move data older than 12 months', color: 'green' }
                ].map((tool, idx) => (
                  <Card key={idx} className={`bg-slate-900 border-slate-700 border-l-4 ${
                    tool.color === 'blue' ? 'border-l-blue-500' :
                    tool.color === 'green' ? 'border-l-green-500' :
                    'border-l-yellow-500'
                  }`}>
                    <CardHeader>
                      <CardTitle>{tool.name}</CardTitle>
                      <CardDescription>{tool.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className={`w-full ${
                        tool.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                        tool.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                        'bg-yellow-600 hover:bg-yellow-700'
                      }`}>
                        Execute
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>📌 Admin Dashboard - Technical Access Required</p>
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

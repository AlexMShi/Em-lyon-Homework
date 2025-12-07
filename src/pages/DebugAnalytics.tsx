import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { getStoredEvents, clearEvents, exportEvents, getExperimentVariants } from '@/lib/analytics';
import { Download, Trash2, RefreshCw } from 'lucide-react';

export default function DebugAnalytics() {
  const [events, setEvents] = useState(getStoredEvents());
  const experiments = getExperimentVariants();

  const handleRefresh = () => {
    setEvents(getStoredEvents());
  };

  const handleExport = () => {
    const data = exportEvents();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emeis-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Clear all analytics events?')) {
      clearEvents();
      setEvents([]);
    }
  };

  // Group events by page
  const eventsByPage = events.reduce((acc, event) => {
    const page = event.page || 'unknown';
    if (!acc[page]) acc[page] = [];
    acc[page].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  // Count event types
  const eventCounts = events.reduce((acc, event) => {
    acc[event.event] = (acc[event.event] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  Analytics Debug
                </h1>
                <p className="text-muted-foreground">
                  View and export tracked events. {events.length} events recorded.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleRefresh}>
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button variant="secondary" onClick={handleExport}>
                  <Download className="w-4 h-4" />
                  Export JSON
                </Button>
                <Button variant="destructive" onClick={handleClear}>
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* Experiment Status */}
            <div className="card-trust mb-8">
              <h2 className="font-semibold text-foreground mb-4">Active Experiments</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">Transparency</p>
                  <p className="text-2xl font-bold text-primary">{experiments.transparency}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">Reviews</p>
                  <p className="text-2xl font-bold text-primary">{experiments.reviews}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">After-Sale</p>
                  <p className="text-2xl font-bold text-primary">{experiments.aftersale}</p>
                </div>
              </div>
            </div>

            {/* Event Summary */}
            <div className="card-trust mb-8">
              <h2 className="font-semibold text-foreground mb-4">Event Summary</h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(eventCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([event, count]) => (
                    <span 
                      key={event}
                      className="px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      <span className="font-mono text-primary">{event}</span>
                      <span className="text-muted-foreground ml-2">×{count}</span>
                    </span>
                  ))}
              </div>
            </div>

            {/* Events by Page */}
            <div className="space-y-6">
              {Object.entries(eventsByPage).map(([page, pageEvents]) => (
                <div key={page} className="card-trust">
                  <h2 className="font-semibold text-foreground mb-4">
                    {page} ({pageEvents.length} events)
                  </h2>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {pageEvents.slice().reverse().map((event, i) => (
                      <div 
                        key={i}
                        className="flex items-start gap-4 p-3 bg-muted/30 rounded-xl text-sm"
                      >
                        <span className="font-mono text-muted-foreground whitespace-nowrap">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="font-mono text-primary font-medium">
                          {event.event}
                        </span>
                        {event.data && (
                          <span className="text-muted-foreground font-mono text-xs">
                            {JSON.stringify(event.data)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {events.length === 0 && (
              <div className="card-trust text-center py-12">
                <p className="text-muted-foreground">No events recorded yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Navigate the site to generate events.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

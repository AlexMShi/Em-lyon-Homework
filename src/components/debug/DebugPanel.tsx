import { useState } from 'react';
import { X, Bug, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getExperimentVariants,
  setExperimentVariant,
  ExperimentId,
  Variant,
  getStoredEvents,
  clearEvents,
  exportEvents,
} from '@/lib/analytics';

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [variants, setVariants] = useState(getExperimentVariants());
  const events = getStoredEvents();

  const handleVariantChange = (experiment: ExperimentId, variant: Variant) => {
    setExperimentVariant(experiment, variant);
    setVariants(getExperimentVariants());
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
      window.location.reload();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-navy text-cream rounded-full shadow-medium flex items-center justify-center hover:bg-navy-light transition-colors"
        aria-label="Open debug panel"
      >
        <Bug className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-[80vh] bg-card border border-border rounded-2xl shadow-medium overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
        <h3 className="font-semibold flex items-center gap-2">
          <Bug className="w-4 h-4" />
          Debug Panel
        </h3>
        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-background rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto max-h-[60vh]">
        {/* A/B Experiments */}
        <div>
          <h4 className="text-sm font-semibold mb-3">A/B Experiments</h4>
          <div className="space-y-3">
            {(['transparency', 'reviews', 'aftersale'] as ExperimentId[]).map((exp) => (
              <div key={exp} className="flex items-center justify-between">
                <span className="text-sm capitalize">{exp}</span>
                <div className="flex gap-1">
                  {(['A', 'B'] as Variant[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => handleVariantChange(exp, v)}
                      className={`px-3 py-1 text-xs font-medium rounded ${
                        variants[exp] === v
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Reload page after changing to see effect.
          </p>
        </div>

        {/* Analytics */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Analytics ({events.length} events)</h4>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleExport} className="flex-1">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
            <Button size="sm" variant="outline" onClick={handleClear} className="flex-1">
              <Trash2 className="w-3 h-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        {/* Recent Events */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Recent Events</h4>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {events.slice(-10).reverse().map((event, i) => (
              <div key={i} className="text-xs p-2 bg-muted rounded">
                <span className="font-mono text-primary">{event.event}</span>
                <span className="text-muted-foreground ml-2">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-xs text-muted-foreground">No events yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

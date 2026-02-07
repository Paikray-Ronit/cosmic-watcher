import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { DataPanel } from "@/components/ui/DataPanel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { TerminalText } from "@/components/ui/TerminalText";
import { 
  Rocket, 
  Globe, 
  AlertTriangle, 
  Eye, 
  BarChart3, 
  LogOut,
  User
} from "lucide-react";

export default function Index() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 p-4 rounded-full bg-primary/10 border border-primary/30 glow-green inline-block">
            <Rocket className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <TerminalText variant="muted" blink>
            INITIALIZING MISSION CONTROL...
          </TerminalText>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-mono text-lg font-bold tracking-wider">
                COSMIC WATCH
              </h1>
              <TerminalText variant="muted" size="xs">
                NEO MONITORING SYSTEM v1.0
              </TerminalText>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
              <User className="h-4 w-4 text-muted-foreground" />
              <TerminalText variant="muted" size="xs">
                {user.email}
              </TerminalText>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="font-mono text-xs"
            >
              <LogOut className="h-4 w-4 mr-2" />
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="font-mono text-2xl font-bold mb-2">
            MISSION CONTROL DASHBOARD
          </h2>
          <TerminalText variant="muted">
            Welcome, Operator. Systems online and monitoring active.
          </TerminalText>
        </div>

        {/* Quick Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DataPanel title="SYSTEM STATUS">
            <div className="flex items-center justify-between">
              <TerminalText variant="success" size="lg">ONLINE</TerminalText>
              <StatusIndicator level="low" showLabel={false} pulse />
            </div>
          </DataPanel>

          <DataPanel title="NEO DATABASE">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-glow-blue" />
              <div>
                <TerminalText size="lg">READY</TerminalText>
                <TerminalText variant="muted" size="xs">Awaiting data fetch</TerminalText>
              </div>
            </div>
          </DataPanel>

          <DataPanel title="ALERTS">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
              <div>
                <TerminalText size="lg">0 ACTIVE</TerminalText>
                <TerminalText variant="muted" size="xs">No alerts pending</TerminalText>
              </div>
            </div>
          </DataPanel>

          <DataPanel title="WATCHLIST">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-muted-foreground" />
              <div>
                <TerminalText size="lg">0 TRACKED</TerminalText>
                <TerminalText variant="muted" size="xs">Add asteroids to monitor</TerminalText>
              </div>
            </div>
          </DataPanel>
        </div>

        {/* Features Coming Soon */}
        <DataPanel 
          title="PHASE 1 COMPLETE" 
          subtitle="Foundation & Authentication"
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <TerminalText variant="success">✓</TerminalText>
                </div>
                <div>
                  <TerminalText>User Authentication</TerminalText>
                  <TerminalText variant="muted" size="xs">Email/password login system</TerminalText>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <TerminalText variant="success">✓</TerminalText>
                </div>
                <div>
                  <TerminalText>NASA-Inspired Design</TerminalText>
                  <TerminalText variant="muted" size="xs">Mission control aesthetics</TerminalText>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <TerminalText variant="success">✓</TerminalText>
                </div>
                <div>
                  <TerminalText>Database Schema</TerminalText>
                  <TerminalText variant="muted" size="xs">Profiles, watchlist, alerts, cache</TerminalText>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                <TerminalText variant="muted" size="xs" className="uppercase mb-2 block">
                  NEXT PHASE
                </TerminalText>
                <TerminalText size="sm">NASA API Integration & Dashboard</TerminalText>
                <div className="mt-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-glow-blue" />
                  <TerminalText variant="muted" size="xs">
                    Real-time asteroid feed, risk analysis, data visualization
                  </TerminalText>
                </div>
              </div>
            </div>
          </div>
        </DataPanel>

        {/* Risk Level Legend */}
        <DataPanel title="RISK LEVEL INDICATORS" subtitle="Threat classification system">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <StatusIndicator level="critical" showLabel={false} size="lg" />
              <div>
                <TerminalText size="sm">CRITICAL</TerminalText>
                <TerminalText variant="muted" size="xs">80-100 score</TerminalText>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <StatusIndicator level="high" showLabel={false} size="lg" />
              <div>
                <TerminalText size="sm">HIGH</TerminalText>
                <TerminalText variant="muted" size="xs">60-79 score</TerminalText>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <StatusIndicator level="moderate" showLabel={false} size="lg" />
              <div>
                <TerminalText size="sm">MODERATE</TerminalText>
                <TerminalText variant="muted" size="xs">40-59 score</TerminalText>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <StatusIndicator level="low" showLabel={false} size="lg" />
              <div>
                <TerminalText size="sm">LOW</TerminalText>
                <TerminalText variant="muted" size="xs">0-39 score</TerminalText>
              </div>
            </div>
          </div>
        </DataPanel>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <TerminalText variant="muted" size="xs">
            COSMIC WATCH • POWERED BY NASA NEOWS API • DATA FOR RESEARCH PURPOSES
          </TerminalText>
        </div>
      </footer>
    </div>
  );
}

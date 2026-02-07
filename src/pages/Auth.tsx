import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TerminalText } from "@/components/ui/TerminalText";
import { AlertCircle, Rocket, Shield, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Auth() {
  const navigate = useNavigate();
  const { user, signIn, signUp, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (type: "signin" | "signup") => {
    setError(null);
    setSuccessMessage(null);

    // Validate input
    const validation = authSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      if (type === "signup") {
        const { error } = await signUp(formData.email, formData.password);
        if (error) {
          if (error.message.includes("already registered")) {
            setError("This email is already registered. Please sign in instead.");
          } else {
            setError(error.message);
          }
        } else {
          setSuccessMessage("Check your email to confirm your account before signing in.");
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login")) {
            setError("Invalid email or password. Please try again.");
          } else {
            setError(error.message);
          }
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <TerminalText variant="muted" blink>
          INITIALIZING SYSTEMS...
        </TerminalText>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grid-pattern relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/30 glow-green">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="font-mono text-3xl font-bold tracking-wider text-foreground mb-2">
            COSMIC WATCH
          </h1>
          <TerminalText variant="muted" size="sm">
            NEAR-EARTH OBJECT MONITORING SYSTEM
          </TerminalText>
        </div>

        {/* Auth Card */}
        <Card className="w-full max-w-md bg-card/80 backdrop-blur border-border">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="font-mono text-lg tracking-wider text-center">
              MISSION CONTROL ACCESS
            </CardTitle>
            <CardDescription className="text-center">
              <TerminalText variant="muted" size="xs">
                AUTHENTICATE TO ACCESS SYSTEMS
              </TerminalText>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="font-mono text-xs">
                  SIGN IN
                </TabsTrigger>
                <TabsTrigger value="signup" className="font-mono text-xs">
                  REGISTER
                </TabsTrigger>
              </TabsList>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <TerminalText variant="error" size="xs">
                    {error}
                  </TerminalText>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                  <TerminalText variant="success" size="xs">
                    {successMessage}
                  </TerminalText>
                </div>
              )}

              <TabsContent value="signin">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit("signin");
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="font-mono text-xs uppercase">
                      Email
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="operator@nasa.gov"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="font-mono bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="font-mono text-xs uppercase">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="font-mono bg-background/50 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-mono uppercase tracking-wider"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <TerminalText blink>AUTHENTICATING...</TerminalText>
                    ) : (
                      "INITIATE SESSION"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit("signup");
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="font-mono text-xs uppercase">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="operator@nasa.gov"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="font-mono bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="font-mono text-xs uppercase">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 characters"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="font-mono bg-background/50 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-mono uppercase tracking-wider"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <TerminalText blink>PROCESSING...</TerminalText>
                    ) : (
                      "CREATE OPERATOR ID"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <TerminalText variant="muted" size="xs">
            POWERED BY NASA NEOWS API
          </TerminalText>
        </div>
      </div>
    </div>
  );
}

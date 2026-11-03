"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/store";

export function AuthModal() {
  const open = useApp((s) => s.signupOpen);
  const close = useApp((s) => s.closeSignup);
  const setUser = useApp((s) => s.setUser);
  const dismissPopup = useApp((s) => s.dismissPopup);
  const guestCodes = useApp((s) => s.guestCodes);
  const setView = useApp((s) => s.setView);

  const [tab, setTab] = useState<"signup" | "login">("signup");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });

  // When opened as the third-generation invitation, default to signup tab.
  useEffect(() => {
    if (open) setTab("signup");
  }, [open]);

  const submit = async (mode: "signup" | "login") => {
    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "register" : "login";
      const payload =
        mode === "signup"
          ? form
          : { email: form.email, password: form.password };
      const res = await fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setUser(data.user);
      toast.success(mode === "signup" ? "Account created — welcome!" : "Signed in");
      dismissPopup();
      close();
      // Offer to move guest codes into their new account.
      if (mode === "signup" && guestCodes.length) {
        setTimeout(() => {
          toast(`You have ${guestCodes.length} codes from this session. Save them to your account from the dashboard.`, {
            duration: 6000,
            action: { label: "Open dashboard", onClick: () => setView("dashboard") },
          });
        }, 600);
      }
      setView("dashboard");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not continue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) close(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Save your codes. Access them anytime!</DialogTitle>
          <DialogDescription>
            You can keep generating for free without an account. Create one only if you want to save, organise and re-open your QR codes and barcodes.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "signup" | "login")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Create free account</TabsTrigger>
            <TabsTrigger value="login">Sign in</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="sf-name">Full name</Label>
              <Input id="sf-name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Ada Lovelace" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sf-email">Email address</Label>
              <Input id="sf-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sf-phone">Phone number</Label>
              <Input id="sf-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 0100" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sf-pw">Password</Label>
              <Input id="sf-pw" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 8 characters" />
            </div>
            <Button className="w-full" onClick={() => submit("signup")} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create free account
            </Button>
          </TabsContent>

          <TabsContent value="login" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="sf-li-email">Email address</Label>
              <Input id="sf-li-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sf-li-pw">Password</Label>
              <Input id="sf-li-pw" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <Button className="w-full" onClick={() => submit("login")} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <span>No OTP. No email verification. No phone verification. Creating an account is completely optional and never blocks generation.</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <button onClick={() => { dismissPopup(); close(); }} className="text-muted-foreground hover:text-foreground">Continue without account</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        
        <div className="mb-20 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Evolutionary Content Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground">
            Don&apos;t just generate. Forge. Our multi-layered infrastructure is built for reliability, security, and exponential scale.
          </p>
        </div>

        {/* Bento Grid layout config */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Feature Block */}
          <div className="md:col-span-8 glass-card rounded-2xl p-8 overflow-hidden relative group flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-primary text-[40px] mb-6">hub</span>
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-4">Multi-Model Engine</h3>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                Seamlessly bridge GPT-4, Claude 3, and specialized Llama instances. Forge manages the orchestration so you focus on the vision.
              </p>
            </div>
            <div className="mt-12 rounded-xl border border-border overflow-hidden h-64 bg-accent/20 relative">
               {/* Replace with your illustration layout component block as needed */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Secure Vault Block */}
          <div className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-primary text-[40px] mb-6">shield</span>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-4">The Vault</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Quantum-resistant encryption for your proprietary data. Your creative intellectual property remains strictly yours.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">verified</span>
                </div>
                <span className="text-xs font-semibold font-mono tracking-widest text-foreground">ISO 27001 SOC2</span>
              </div>
            </div>
          </div>

          {/* Governance Control Block */}
          <div className="md:col-span-4 glass-card rounded-2xl p-8">
            <span className="material-symbols-outlined text-primary text-[40px] mb-6">gavel</span>
            <h3 className="text-2xl font-bold font-heading text-foreground mb-4">Governance</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enterprise-grade RBAC and audit trails. Complete transparency into token usage and team throughput.
            </p>
          </div>

          {/* Pipeline Automation Block */}
          <div className="md:col-span-8 glass-card rounded-2xl p-8 flex flex-col md:flex-row gap-6 overflow-hidden group">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-[40px] mb-6">automation</span>
                <h3 className="text-2xl font-bold font-heading text-foreground mb-4">Auto-Pipeline</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  From ideation to CMS publishing in one flow. Automated quality checks and brand voice alignment.
                </p>
              </div>
              <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform duration-200 text-sm mt-auto text-left">
                Explore integrations <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="flex-1 rounded-xl border border-border overflow-hidden h-48 md:h-full min-h-[180px] bg-accent/10 relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent group-hover:rotate-1 transition-transform duration-500" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

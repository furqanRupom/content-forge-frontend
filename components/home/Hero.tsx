import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="pt-32 pb-24 md:pt-40 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-muted/50 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium uppercase tracking-widest text-primary">Obsidian Forge Evolution V2.0</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] max-w-5xl mx-auto">
          Forge Your Content <span className="text-primary">Future</span>
        </h1>

        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
          The next-generation framework for high-output technical teams. Build complex content architectures with obsidian-level clarity and AI-driven speed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button size="lg" className="text-lg px-10 py-7">Get Started Free</Button>
          <Button size="lg" variant="outline" className="text-lg px-10 py-7">View Demo</Button>
        </div>

        {/* Hero Image */}
        <div className="mt-16 rounded-3xl overflow-hidden border bg-card shadow-2xl relative max-w-6xl mx-auto">
          <div className="h-14 bg-muted border-b flex items-center px-6 gap-3">
            <div className="flex gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto text-sm font-mono text-muted-foreground">content-forge.ai/dashboard/evolution</div>
          </div>

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeo0mhfnSpLy7iWvmPZvR3H1NMX-tEPaPrHEhL9xMyE6Ohip8QEohLqmLt3xs-AhOnqDgvj1ofa3iN_Y5KzR_OTCeeI9lvrBLqOytBHihLja3aSq_85glO_xn9mvAxSD7IAdMFaWXVAwCsTb36IQAR5XN8V1vl9STOkK6MDHlm-kzIve9llRh_upphsAtzpdSLxpMX1jPHJUjcfyb9UN4pazBw58-PWvABOpICgYYHNZ3dNmKL3dg46viFNmFJafDf0DAx30kICjT-"
            alt="Content Forge Hero"
            width={1400}
            height={720}
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
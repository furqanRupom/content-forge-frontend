import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-muted/30 border-t">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-20">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <div className="text-2xl font-bold tracking-tighter mb-4">Content Forge AI</div>
                        <p className="text-muted-foreground max-w-sm">
                            Forging the future of technical content through sophisticated AI orchestration.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Product</h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Company</h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">About</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
                    © 2026 Content Forge AI. Obsidian Forge Evolution v2.0
                </div>
            </div>
        </footer>
    );
}
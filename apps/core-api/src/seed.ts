import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../../libs/database/src/schema';
import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seed() {
    console.log('Seeding database...');
    try {
        // Clear existing data
        await db.delete(schema.blogs);
        await db.delete(schema.saasProducts);

        // Find or create an admin user
        let [user] = await db.select().from(schema.users).limit(1);
        let userId: number;
        if (!user) {
            const [newUser] = await db.insert(schema.users).values({
                email: 'admin@codeswayam.com',
                password: 'password',
                role: 'admin',
            }).returning();
            userId = newUser.id;
            console.log('Created dummy admin user');
        } else {
            userId = user.id as number;
        }

        const saasProductsData = [
            {
                saasId: 'auraflow',
                icon: '📱',
                name: 'Auraflow',
                tag: 'Social Media Management',
                description: 'Schedule, analyze, and automate content across all your social channels with AI.',
                domain: 'auraflow.codeswayam.com',
                status: 'Live',
                featured: 'true'
            },
            {
                saasId: 'chatlift',
                icon: '⚡',
                name: 'ChatLift',
                tag: 'Instagram DM Automation',
                description: 'Automate replies, nurture leads, and close sales directly from your Instagram DMs.',
                domain: 'chatlift.codeswayam.com',
                status: 'Live',
                featured: 'true'
            },
            {
                saasId: 'mailtracker',
                icon: '📧',
                name: 'MailTracker',
                tag: 'Email Intelligence',
                description: 'Know exactly when and where your emails are opened, clicked, and replied to.',
                domain: 'mail.codeswayam.com',
                status: 'Live',
                featured: 'true'
            },
            {
                saasId: 'invoiceos',
                icon: '🧾',
                name: 'InvoiceOS',
                tag: 'Finance Automation',
                description: 'Auto-generate and collect invoices directly tied to your database.',
                domain: 'invoice.codeswayam.com',
                status: 'Live',
                featured: 'false'
            },
            {
                saasId: 'docuchat',
                icon: '💬',
                name: 'DocuChat',
                tag: 'AI Knowledge Base',
                description: 'Chat directly with your internal documents using our secure LLM wrapper.',
                domain: 'docuchat.codeswayam.com',
                status: 'Beta',
                featured: 'false'
            },
            {
                saasId: 'more-coming',
                icon: '🚀',
                name: 'More Coming Soon',
                tag: 'Incubator',
                description: 'We are constantly adding new tools to the ecosystem. Stay tuned.',
                domain: 'codeswayam.com',
                status: 'Soon',
                featured: 'false'
            },
        ];

        console.log('Inserting SaaS products...');
        for (const product of saasProductsData) {
            await db.insert(schema.saasProducts).values(product);
        }

        const blogPostsData = [
            {
                saas: 'chatlift',
                tag: 'ChatLift',
                title: '5 Instagram DM Automation Strategies to Double Your Leads',
                slug: '5-dm-strategies',
                excerpt: 'Discover how top brands are using automated DMs to nurture followers into paying customers on autopilot.',
                content: 'Full article content for DM automation strategies would go here...',
                featured: 'true',
                authorId: userId
            },
            {
                saas: 'engineering',
                tag: 'Engineering',
                title: 'Why We Chose a Multi-Schema Database for our 50-App Ecosystem',
                slug: 'multi-schema-database',
                excerpt: 'A deep dive into the backend architecture that allows Code Swayam to scale dozens of SaaS products from a single repository.',
                content: 'Full article content on architecture would go here...',
                featured: 'true',
                authorId: userId
            },
            {
                saas: 'auraflow',
                tag: 'Auraflow',
                title: 'The Ultimate Content Calendar Template for 2026',
                slug: 'content-calendar-2026',
                excerpt: 'Stop guessing what to post. Use our battle-tested formula to plan a month of content in just two hours.',
                content: 'Full template content would go here...',
                featured: 'true',
                authorId: userId
            },
            {
                saas: 'mailtracker',
                tag: 'MailTracker',
                title: 'How to Increase Cold Email Open Rates by 300%',
                slug: 'increase-open-rates',
                excerpt: 'We analyzed 10 million tracked emails to find the exact subject line formulas that get opened.',
                content: 'Full email marketing article would go here...',
                featured: 'false',
                authorId: userId
            }
        ];

        console.log('Inserting Blog posts...');
        for (const post of blogPostsData) {
            await db.insert(schema.blogs).values(post);
        }

        console.log('✅ Seeding completed successfully!');
    } catch (e) {
        console.error('❌ Seeding failed:', e);
    } finally {
        await pool.end();
    }
}

seed();

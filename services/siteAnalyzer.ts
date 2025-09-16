import { ProjectContact } from "../types";

export interface AnalyzedData {
    tags: string[];
    techStack: string;
    contacts: ProjectContact;
}

const KEYWORD_MAP: Record<string, string[]> = {
    'Saúde': ['saúde', 'clínica', 'médico', 'dentista', 'odontologia', 'consultório'],
    'Jurídico': ['advocacia', 'advogado', 'direito', 'jurídico', 'causas'],
    'Imobiliário': ['imobiliária', 'imóveis', 'corretor', 'apartamento', 'casa'],
    'E-commerce': ['loja', 'comprar', 'carrinho', 'produto', 'venda'],
    'Tecnologia': ['saas', 'software', 'tecnologia', 'startup', 'app'],
    'Portfolio': ['portfolio', 'projetos', 'designer', 'developer'],
};

const TECH_STACK_FILES: Record<string, string> = {
    'package.json': 'React/Vue/Node', // Simplified
    'next.config.js': 'Next.js',
    'vue.config.js': 'Vue.js',
    'angular.json': 'Angular',
};

// This is a simplified mock analyzer. A real implementation would be more robust.
export const analyzeSite = async (files: FileList): Promise<AnalyzedData> => {
    const fileArray = Array.from(files);
    let techStack = 'HTML/CSS/JS';
    const tags = new Set<string>();
    const contacts: ProjectContact = {};
    
    // Read file contents into memory (for small projects)
    const fileContents = await Promise.all(
        fileArray.filter(f => f.type.startsWith('text/') || f.name.endsWith('.json'))
                 .map(file => file.text().then(content => ({ name: file.name, content })))
    );

    // 1. Determine Tech Stack
    for (const file of fileContents) {
        if (file.name === 'package.json') {
            try {
                const pkg = JSON.parse(file.content);
                if (pkg.dependencies?.['next']) techStack = 'Next.js';
                else if (pkg.dependencies?.['react']) techStack = 'React';
                else if (pkg.dependencies?.['vue']) techStack = 'Vue.js';
                else if (pkg.dependencies?.['@angular/core']) techStack = 'Angular';
                else techStack = 'Node.js Project';
                break; // Found it
            } catch (e) { console.error("Could not parse package.json"); }
        }
    }
    tags.add(techStack);

    // 2. Analyze content for keywords and contacts
    const allTextContent = fileContents.map(f => f.content).join(' ').toLowerCase();

    // Find tags
    for (const [tag, keywords] of Object.entries(KEYWORD_MAP)) {
        if (keywords.some(keyword => allTextContent.includes(keyword))) {
            tags.add(tag);
        }
    }

    // Find email
    const emailRegex = /[\w.-]+@[\w-]+\.[\w.-]{2,}/g;
    const foundEmails = allTextContent.match(emailRegex);
    if (foundEmails && foundEmails.length > 0) {
        contacts.email = foundEmails[0];
    }
    
    // Find phone
    const phoneRegex = /(?:\(?\d{2}\)?\s?)?(?:9\d{4}|\d{4})[-\s]?\d{4}/g;
    const foundPhones = allTextContent.match(phoneRegex);
    if (foundPhones && foundPhones.length > 0) {
        contacts.phone = foundPhones[0];
    }

    return new Promise(resolve => {
        setTimeout(() => { // Simulate async work
            resolve({
                tags: Array.from(tags),
                techStack,
                contacts,
            });
        }, 500);
    });
};

export interface IGenerationSuccessPayload {
    id: string;
    userId: string;
    templateId: string;
    inputPrompt: string;
    inputPayload: Record<string, any> | any;
    status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED"
    model: string;
    temperature: number;
    tokensUsed: number;
    errorMessage: string | null;
    createdAt: string; 
    updatedAt: string;
    template?: {
        id: string;
        title: string;
        key: string;
        description: string;
        promptHint: string | null;
        type: string;
        category: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    };
    generatedContent: {
        id: string;
        jobId: string;
        title: string;
        outputText: string;
        outputPayload: {
            raw: string;
            metadata: Record<string, any>;
        };
        tone: string | null;
        language: string | null;
        wordCount: number;
        createdAt: string;
        updatedAt: string;
    };
}



export interface ITemplateRelation {
    id: string;
    key: string;
    title: string;
    description: string;
    type: string;
    category: string;
    promptHint: string | null;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface IGeneratedContentRelation {
    id: string;
    jobId: string;
    title: string;
    outputText: string;
    outputPayload: Record<string, any> | null;
    tone: string | null;
    language: string | null;
    wordCount: number;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// Base structure returned by findFirst / update / regenerate
export interface IGenerationJobPayload {
    id: string;
    userId: string;
    templateId: string;
    inputPrompt: string;
    inputPayload: Record<string, any> | any;
    status:  "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED"
    model: string;
    temperature: number;
    tokensUsed: number;
    errorMessage: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    template: ITemplateRelation;
    generatedContent: IGeneratedContentRelation | null;
}
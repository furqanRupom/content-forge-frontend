/*
  {
      "id": "4612371a-4a12-41a2-8ecf-4885b13a0e97",
      "key": "gen-auto-idea-generation",
      "title": "Idea Generation Helper",
      "description": "Standard assistant optimized for processing configurations for Idea Generation workflows.",
      "type": "IDEA_GENERATION",
      "category": "General Utility",
      "promptHint": "Provide key reference context or details you want organized.",
      "isActive": true,
      "createdAt": "2026-06-28T14:39:57.263Z",
      "updatedAt": "2026-06-28T14:39:57.263Z",
      "generationJobs": [],
      "_count": {
        "generationJobs": 0
      }


*/

export interface ITemplate {
    id:string;
    key:string;
    title:string;
    description:string;
    type:string;
    category:string;
    promptHint:string;
    isActive:boolean;
    createdAt:string;
    updatedAt:string;
    generationJobs:[];
    _count:{
        generationJobs:number
    }
}
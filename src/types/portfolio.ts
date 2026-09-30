export type ProjectId = 'recall' | 'bidly' | 'shopmesh'
export interface Project {
  id: ProjectId; name: string; category: string; title: string; description: string;
  stack: string[]; github: string; problem: string; solution: string;
  decisions: string[]; outcome: string; metric: string; metricLabel: string;
}

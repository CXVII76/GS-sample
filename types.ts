export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  ROADMAP = 'ROADMAP',
  PIPELINE_VISUAL = 'PIPELINE_VISUAL',
  ASSISTANT = 'ASSISTANT'
}

export interface Step {
  id: string;
  title: string;
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Complete';
  tool: string;
  ismControl: string;
}

export interface PipelineStage {
  name: string;
  status: 'Idle' | 'Running' | 'Success' | 'Failed';
  jobs: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export const INITIAL_STEPS: Step[] = [
  {
    id: '1',
    title: 'Secure the Repository',
    description: 'Enable Branch Protection rules in GitHub. Require pull request reviews before merging to main. This prevents accidental breaking changes.',
    complexity: 'Low',
    status: 'Pending',
    tool: 'GitHub Settings',
    ismControl: 'Software Development'
  },
  {
    id: '2',
    title: 'Basic Build Workflow',
    description: 'Create a .github/workflows/build.yml. Use a standard "Starter Workflow" for Node.js/React. Just ensure it runs "npm install" and "npm run build".',
    complexity: 'Low',
    status: 'Pending',
    tool: 'GitHub Actions',
    ismControl: 'Change Management'
  },
  {
    id: '3',
    title: 'Automated Security Scanning (SAST)',
    description: 'Enable GitHub Advanced Security. Switch on "CodeQL" and add "Trivy" action for container/dependency scanning. This covers the PDF requirement for vulnerability scanning.',
    complexity: 'Medium',
    status: 'Pending',
    tool: 'CodeQL / Trivy',
    ismControl: 'Vulnerability Management'
  },
  {
    id: '4',
    title: 'Azure OIDC Authentication',
    description: 'Connect GitHub to Azure using OpenID Connect (OIDC). This avoids storing long-lived secrets (username/passwords) in GitHub. Highly recommended for ISM compliance.',
    complexity: 'Medium',
    status: 'Pending',
    tool: 'Azure Entra ID',
    ismControl: 'Authentication'
  },
  {
    id: '5',
    title: 'Infrastructure as Code (IaC)',
    description: 'Do not manually click in Azure Portal. Use a Bicep file to define your App Service and PostgreSQL. Commit this file to the repo.',
    complexity: 'High',
    status: 'Pending',
    tool: 'Azure Bicep',
    ismControl: 'Configuration Management'
  },
  {
    id: '6',
    title: 'OSCAL Documentation',
    description: 'Use a simplified generator tool to map your GitHub Actions results to OSCAL JSON. Don\'t write XML manually. Map "Trivy Success" to "Vulnerability Control Met".',
    complexity: 'High',
    status: 'Pending',
    tool: 'OSCAL Tools',
    ismControl: 'Documentation'
  }
];
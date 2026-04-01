export enum RequestType {
  VACATION = 'VACATION LEAVE',
  SICK = 'SICK LEAVE',
  PERSONAL = 'PERSONAL LEAVE',
  EXPENSE = 'EXPENSE REIMBURSEMENT',
  HARDWARE = 'HARDWARE REQUEST',
}

export interface ApprovalRequest {
  id: string;
  user: {
    name: string;
    role: string;
    team: string;
    avatar?: string;
    initials?: string;
  };
  type: RequestType;
  details: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ApprovalsState {
  requests: ApprovalRequest[];
  filter: string;
}

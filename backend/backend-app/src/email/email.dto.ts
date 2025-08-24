// src/email/email.dto.ts
export interface ReceivingHop {
  from: string;
  to: string;
  delay: string;
  protocol: string;
  time: string;
}

export class AnalyzeEmailResponse {
  receivingChain: ReceivingHop[];
  espType: string;
}

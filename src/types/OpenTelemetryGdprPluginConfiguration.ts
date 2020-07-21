export interface OpenTelemetryGdprPluginConfiguration {
  serviceName: string;
  location: string;
  baseTTL: number;
  baseLegalBasis: string;
  baseLegitimateInterest: string;
  baseAutomatedDecisionMaking: boolean;
  basePurpose: string;
}

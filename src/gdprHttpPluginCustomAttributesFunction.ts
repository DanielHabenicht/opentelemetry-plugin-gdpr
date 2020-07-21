import { OpenTelemetryGdprPluginConfiguration } from './types/OpenTelemetryGdprPluginConfiguration';
import { Span } from '@opentelemetry/api';

const GdprHttpPluginCustomAttributesFunction = (
  configuration: OpenTelemetryGdprPluginConfiguration,
  otherCustomFunction?: (span: Span, request: Request, response: Response) => void
) => ({
  applyCustomAttributesOnSpan: (span: Span, request: any, response: any) => {
    // Execute custom user function
    if (otherCustomFunction) otherCustomFunction(span, request, response);

    // we set location no matter what
    span.setAttribute('gdpr.location', configuration.location);

    if (request.headers) {
      // we override configuration's headers if the request provides us with corresponding values
      span.setAttribute('gdpr.ttl', request.headers['gdpr.ttl'] ? request.headers['gdpr.ttl'] : configuration.baseTTL);
      span.setAttribute(
        'gdpr.legalBasis',
        request.headers['gdpr.legalBasis'] ? request.headers['gdpr.legalBasis'] : configuration.baseLegalBasis
      );
      span.setAttribute(
        'gdpr.legitimateInterest',
        request.headers['gdpr.legitimateInterest']
          ? request.headers['gdpr.legitimateInterest']
          : configuration.baseLegitimateInterest
      );
      span.setAttribute(
        'gdpr.automatedDecisionMaking',
        request.headers['gdpr.automatedDecisionMaking']
          ? request.headers['gdpr.automatedDecisionMaking']
          : configuration.baseAutomatedDecisionMaking
      );
      span.setAttribute(
        'gdpr.purpose',
        request.headers['gdpr.purpose'] ? request.headers['gdpr.purpose'] : configuration.basePurpose
      );
    }
  },
});

export { GdprHttpPluginCustomAttributesFunction, OpenTelemetryGdprPluginConfiguration };

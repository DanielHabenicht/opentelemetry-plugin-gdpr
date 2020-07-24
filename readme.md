# Opentelemetry - GDPR Plugin

This packages allows to quickly add GDPR Info to spans.
Currently implemented as a Proof of Concept for Express Servers.

## Quickstart

### In one line

Add this at the start of your app:

```typescript
// 1. Import this package
import { tracingFullConfiguration, OpenTelemetryGdprPluginConfiguration } from 'opentelemetry-plugin-gdpr';
// 2. Configure some base information (or add them via Environemnt Variables)
const CONFIG: OpenTelemetryGdprPluginConfiguration = {
  serviceName: SERVICE_NAME,
  location: 'Europe',
  baseTTL: 0,
  baseLegalBasis: 'Contractual',
  baseLegitimateInterest: '',
  baseAutomatedDecisionMaking: false,
  basePurpose: 'Webserver for providing our WebApp',
};
// Load Opentelemetry with our Plugin pre-configured
tracingFullConfiguration(CONFIG);
```

### Usage

All http requests made are automatically traced and the base information are attached. In order to assign specific information to a request Header can be used as a fast an easy way, for example:

```typescript
http.get(
  'http://localhost:4000',
  {
    headers: {
      'gdpr.ttl': '0',
      purpose: 'Showing our example',
    },
  },
  (res) => {
    console.log(res.body);
  }
);
```

They will override the base information for this request.

### More Configuration

1. Integrate with existing OpenTelemetry Configurations.
   Add it to the plugins sections

```typescript
const provider = new NodeTracerProvider({
  plugins: {
    http: {
      enabled: true,
      path: '@opentelemetry/plugin-http',
      // Add our plugin to the http-plugin
      ...GdprHttpPluginCustomAttributesFunction(configuration, (span, request, response) => {}),
    },
  },
});
```

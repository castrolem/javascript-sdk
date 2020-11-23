import { ErrorHandler, LogHandler } from "@optimizely/js-sdk-logging";
import { enums } from "@optimizely/optimizely-sdk";

export type UserAttributes = {
  // TODO[OASIS-6649]: Don't use any type
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [name: string]: any;
}

// Information about past bucketing decisions for a user.
export interface UserProfile {
  user_id: string;
  experiment_bucket_map: {
    [experiment_id: string]: {
      variation_id: string;
    };
  };
}

export type EventTags = {
  [key: string]: string | number | null;
};

export interface UserProfileService {
  lookup(userId: string): UserProfile | undefined;
  save(profile: UserProfile): void;
}

export interface DatafileOptions {
  autoUpdate?: boolean;
  updateInterval?: number;
  urlTemplate?: string;
  datafileAccessToken?: string;
}

export interface ListenerPayload {
  userId: string;
  attributes?: UserAttributes;
}

export type NotificationListener<T extends ListenerPayload> = (notificationData: T) => void;

// An event to be submitted to Optimizely, enabling tracking the reach and impact of
// tests and feature rollouts.
export interface Event {
  // URL to which to send the HTTP request.
  url: string;
  // HTTP method with which to send the event.
  httpVerb: 'POST';
  // Value to send in the request body, JSON-serialized.
  // TODO[OASIS-6649]: Don't use any type
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  params: any;
}

export interface EventDispatcher {
  /**
   * @param event
   *        Event being submitted for eventual dispatch.
   * @param callback
   *        After the event has at least been queued for dispatch, call this function to return
   *        control back to the Client.
   */
  dispatchEvent: (event: Event, callback: (response: { statusCode: number; }) => void) => void;
}

export interface VariationVariable {
  id: string;
  value: string;
}

export interface Variation {
  id: string;
  key: string;
  featureEnabled: boolean;
  variables: VariationVariable[];
}

export interface Experiment {
  id: string;
  key: string;
  variationKeyMap: { [key: string]: Variation }
}

export interface FeatureVariable {
  type: string;
  key: string;
  id: string;
  defaultValue: string;
}

export interface FeatureFlag {
  rolloutId: string;
  key: string;
  id: string;
  experimentIds: string[],
  variables: FeatureVariable[],
  variableKeyMap: { [key: string]: FeatureVariable }
}

export interface FeatureKeyMap {
  [key: string]: FeatureFlag
}

export interface OnReadyResult {
  success: boolean;
  reason?: string;
}

export type ObjectWithUnknownProperties = {
  [key: string]: unknown;
}

/**
 * options required to create optimizely object
 */
export interface OptimizelyOptions {
  UNSTABLE_conditionEvaluators?: unknown;
  clientEngine: string;
  clientVersion?: string;
  datafile?: string;
  datafileOptions?: DatafileOptions;
  errorHandler: ErrorHandler;
  eventBatchSize?: number;
  eventDispatcher: EventDispatcher;
  eventFlushInterval?: number;
  eventMaxQueueSize?: number;
  isValidInstance: boolean;
  // TODO[OASIS-6649]: Don't use object type
  // eslint-disable-next-line  @typescript-eslint/ban-types
  jsonSchemaValidator?: object;
  logger: LogHandler;
  sdkKey?: string;
  userProfileService?: UserProfileService | null;
}

/**
 * Optimizely Config Entities
 */
export interface OptimizelyExperiment {
  id: string;
  key: string;
  variationsMap: {
    [variationKey: string]: OptimizelyVariation;
  };
}

export interface OptimizelyVariable {
  id: string;
  key: string;
  type: string;
  value: string;
}

/**
 * The options object given to Optimizely.createInstance.
 * Entry level Config Entities
 */
export interface Config {
  // TODO[OASIS-6649]: Don't use object type
  // eslint-disable-next-line  @typescript-eslint/ban-types
  datafile?: object | string;
  datafileOptions?: DatafileOptions;
  errorHandler?: ErrorHandler;
  eventDispatcher?: EventDispatcher;
  logger?: LogHandler;
  logLevel?:
    | enums.LOG_LEVEL.DEBUG
    | enums.LOG_LEVEL.ERROR
    | enums.LOG_LEVEL.INFO
    | enums.LOG_LEVEL.NOTSET
    | enums.LOG_LEVEL.WARNING;
  // TODO[OASIS-6649]: Don't use object type
  // eslint-disable-next-line  @typescript-eslint/ban-types
  jsonSchemaValidator?: object;
  userProfileService?: UserProfileService | null;
  eventBatchSize?: number;
  eventFlushInterval?: number;
  sdkKey?: string;
}

export interface OptimizelyFeature {
  id: string;
  key: string;
  experimentsMap: {
    [experimentKey: string]: OptimizelyExperiment;
  };
  variablesMap: {
    [variableKey: string]: OptimizelyVariable;
  };
}

export interface OptimizelyVariation {
  id: string;
  key: string;
  featureEnabled?: boolean;
  variablesMap: {
    [variableKey: string]: OptimizelyVariable;
  };
}

export interface OptimizelyConfig {
  experimentsMap: {
    [experimentKey: string]: OptimizelyExperiment;
  };
  featuresMap: {
    [featureKey: string]: OptimizelyFeature;
  };
  revision: string;
  getDatafile(): string;
}

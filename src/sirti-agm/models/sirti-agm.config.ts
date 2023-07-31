export interface SirtiAgmModuleConfig {
    protocol?: SirtiAgmModuleConfig;
    hostAndPath?: string;
    region?: string | string[];
    apiVersion?: string;
    apiKey?: string | string[];
    signature?: string;
    libraries: string[];
    clientId:  string;
    channel: string;
    language: any;    
}
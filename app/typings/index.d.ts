declare module '*.less';

declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.gif';
declare module '*.webp';

declare interface ImportSync {
  default: any;
  [key: string]: any;
}

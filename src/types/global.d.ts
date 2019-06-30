interface Window {
  __SERVER_DATA__: any;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

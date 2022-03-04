export interface Env {
  production: boolean;
  env: 'dev' | 'prod';

  moralis: {
    /** Moralis Application ID */
    appId: string;
    /** Moralis Server URL */
    serverUrl: string;
  };
}

export const defaultEnv: Env = {
  production: false,
  env: 'dev',
  moralis: {
    appId: 'RHWwPYmy8Lrut3asx7lshzQc2HEuSkprt1sEVUZO',
    serverUrl: 'https://vpcnu02rqahz.moralishost.com:2053/server'
  }
};

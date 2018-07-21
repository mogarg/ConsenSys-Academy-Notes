import { Connect, SimpleSigner } from 'uport-connect';

// Add your tokens below

export const uport = new Connect('Uport Demo', {
  clientId: 'Your clientID token here!',
  network: 'rinkeby',
  signer: SimpleSigner('Your signer token here!')
});

export const web3 = uport.getWeb3();

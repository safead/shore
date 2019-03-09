import { actions } from 'store/actions';
import { store } from 'store';

window.addEventListener( 'offline', () => store.dispatch( actions.offline() ) );
window.addEventListener( 'online', () => store.dispatch( actions.online() ) );

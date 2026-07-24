import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register( './tests/raw-text-loader.mjs', pathToFileURL( './' ) );

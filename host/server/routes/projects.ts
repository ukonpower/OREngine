import express from 'express';

import { ProjectManager } from '../Project';


export const createProjectsRouter = ( pm: ProjectManager ) => {

	const router = express.Router();

	router.get( '/projects', ( _req, res ) => {

		res.json( [ pm.name ] );

	} );

	return router;

};

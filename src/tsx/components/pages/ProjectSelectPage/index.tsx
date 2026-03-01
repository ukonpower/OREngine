import React, { useEffect, useState } from "react";

import style from './index.module.scss';

type Props = {
	onSelectProject: ( name: string ) => void;
};

export const ProjectSelectPage: React.FC<Props> = ( { onSelectProject } ) => {

	const [ projects, setProjects ] = useState<string[]>( [] );
	const [ newName, setNewName ] = useState( '' );
	const [ loading, setLoading ] = useState( true );

	const fetchProjects = () => {

		fetch( '/api/projects' )
			.then( r => r.json() )
			.then( setProjects )
			.finally( () => setLoading( false ) );

	};

	useEffect( () => {

		fetchProjects();

	}, [] );

	const selectProject = async ( name: string ) => {

		const waitForReady = new Promise<void>( ( resolve ) => {

			if ( import.meta.hot ) {

				const handler = () => {

					resolve();
					import.meta.hot!.off( 'project-changed', handler );

				};

				import.meta.hot.on( 'project-changed', handler );
				setTimeout( resolve, 3000 );

			} else {

				resolve();

			}

		} );

		await fetch( '/api/projects/active', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { name } ),
		} );

		await waitForReady;

		onSelectProject( name );

	};

	const createProject = async () => {

		const name = newName.trim();

		if ( ! name ) return;

		const res = await fetch( '/api/projects', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { name } ),
		} );

		if ( res.ok ) {

			setNewName( '' );
			selectProject( name );

		}

	};

	const onKeyDown = ( e: React.KeyboardEvent ) => {

		if ( e.key === 'Enter' ) {

			createProject();

		}

	};

	if ( loading ) {

		return <div className={style.container}>
			<div className={style.inner}>
				<div className={style.loading}>Loading...</div>
			</div>
		</div>;

	}

	return (
		<div className={style.container}>
			<div className={style.inner}>
				<h1 className={style.title}>OREngine</h1>
				<div className={style.section}>
					<div className={style.sectionTitle}>Projects</div>
					<div className={style.projectList}>
						{projects.map( name => (
							<div key={name} className={style.projectItem} onClick={() => selectProject( name )}>
								<span className={style.projectName}>{name}</span>
							</div>
						) )}
						{projects.length === 0 && (
							<div className={style.empty}>No projects</div>
						)}
					</div>
				</div>
				<div className={style.section}>
					<div className={style.sectionTitle}>New Project</div>
					<div className={style.createForm}>
						<input
							className={style.input}
							value={newName}
							onChange={e => setNewName( e.target.value )}
							onKeyDown={onKeyDown}
							placeholder="Project name"
						/>
						<button className={style.createButton} onClick={createProject}>
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	);

};

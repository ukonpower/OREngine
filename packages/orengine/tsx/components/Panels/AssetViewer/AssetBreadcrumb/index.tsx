import style from './index.module.scss';

type AssetBreadcrumbProps = {
	path: string[];
	onNavigate: ( pathIndex: number ) => void;
};

export const AssetBreadcrumb = ( { path, onNavigate }: AssetBreadcrumbProps ) => {

	return <div className={style.breadcrumb}>
		<span className={style.segment} onClick={() => onNavigate( 0 )}>Assets</span>
		{path.map( ( seg, i ) => (
			<span key={i}>
				<span className={style.separator}>/</span>
				<span
					className={style.segment}
					onClick={() => onNavigate( i + 1 )}
					data-active={i === path.length - 1}
				>
					{seg}
				</span>
			</span>
		) )}
	</div>;

};

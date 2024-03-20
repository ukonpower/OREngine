import style from './index.module.scss';

export const CrossIcon = ( ) => {

	return <div className={style.cross}>
		<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="5.12" y="16.832" width="2.57272" height="17.6514" transform="rotate(-135 5.12 16.832)" fill="#D9D9D9"/>
			<rect x="3.30078" y="4.35059" width="2.57272" height="17.6514" transform="rotate(-45 3.30078 4.35059)" fill="#D9D9D9"/>
		</svg>
	</div>;

};

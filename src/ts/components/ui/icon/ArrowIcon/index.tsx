import style from './index.module.scss';

export const ArrowIcon = ( { open }: {open?: boolean} ) => {

	return <div className={style.arrow} data-open={open}>
		<svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_57_2)">
				<path d="M18 10L3 18.6603L3 1.33974L18 10Z" fill="#D9D9D9"/>
			</g>
			<defs>
				<clipPath id="clip0_57_2">
					<rect width="20" height="20" fill="white"/>
				</clipPath>
			</defs>
		</svg>

	</div>;

};

import type { SVGAttributes } from 'svelte/elements';

type TitleType = {
	id?: string;
	title?: string;
};

type DescType = {
	id?: string;
	desc?: string;
};

export interface Props extends SVGAttributes<SVGElement> {
	title?: TitleType;
	desc?: DescType;
	ariaLabel?: string;
	size?: number;
	role?: string;
	color?: string;
	strokeWidth?: number;
}

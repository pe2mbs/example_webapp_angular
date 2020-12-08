export interface MenuItem
{
	caption: string;
	icon: string;
	id: string;
	route?: string;
	children?: MenuItem[];
}

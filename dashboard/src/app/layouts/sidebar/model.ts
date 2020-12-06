export interface MenuItem
{
	caption: string;
	icon: string;
	route?: string;
	children?: MenuItem[];
}

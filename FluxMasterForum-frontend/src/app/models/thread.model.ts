import {UserModel} from "./user.model";
import {CategoryModel} from "./category.model";


export interface ThreadModel {
	id: number;
	category_id: number;
	title: string;
	content: string;
	author: UserModel;

	is_locked: boolean;
	is_pinned: boolean;

	//created_at: string;
	//updated_at: string;
}